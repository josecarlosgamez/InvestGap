import type { Fund, PortfolioPosition, CrisisScenario, StressTestResult, CrisisKey } from '../types';
import { CRISIS_SCENARIOS } from '../data/crises';
import { PROXY_DATA, type ProxyKey, getProxyDrawdown } from '../data/proxies';

interface ProxyWeights {
  US_LARGE_CAP: number;
  US_TECH_GROWTH: number;
  EUROPE_EQUITY: number;
  EM_EQUITY: number;
  GLOBAL_AGG_BOND: number;
  LONG_TREASURY: number;
  HIGH_YIELD_BOND: number;
  GOLD: number;
  COMMODITIES: number;
  REAL_ESTATE: number;
}

function calculateProxyWeights(fund: Fund): ProxyWeights {
  const weights: ProxyWeights = {
    US_LARGE_CAP: 0,
    US_TECH_GROWTH: 0,
    EUROPE_EQUITY: 0,
    EM_EQUITY: 0,
    GLOBAL_AGG_BOND: 0,
    LONG_TREASURY: 0,
    HIGH_YIELD_BOND: 0,
    GOLD: 0,
    COMMODITIES: 0,
    REAL_ESTATE: 0,
  };

  if (fund.assetClass === 'equity') {
    const geo = fund.geoExposure;
    const totalGeo = Object.values(geo).reduce((sum, v) => sum + (v || 0), 0);
    
    const usWeight = (geo.us || 0) / totalGeo;
    const europeWeight = (geo.europe || 0) / totalGeo;
    const emWeight = (geo.emerging_markets || 0) / totalGeo;
    const japanWeight = (geo.japan || 0) / totalGeo;

    if (usWeight > 0) {
      const techExposure = fund.sectorExposure.technology || 0;
      if (techExposure > 40) {
        weights.US_TECH_GROWTH += usWeight * 0.7;
        weights.US_LARGE_CAP += usWeight * 0.3;
      } else if (fund.equityStyle === 'small_cap') {
        weights.US_LARGE_CAP += usWeight * 0.5;
        weights.US_TECH_GROWTH += usWeight * 0.2;
        weights.REAL_ESTATE += usWeight * 0.3;
      } else {
        weights.US_LARGE_CAP += usWeight;
      }
    }

    if (europeWeight > 0) {
      weights.EUROPE_EQUITY += europeWeight;
    }

    if (emWeight > 0) {
      weights.EM_EQUITY += emWeight;
    }

    if (japanWeight > 0) {
      weights.EUROPE_EQUITY += japanWeight * 0.3;
      weights.US_LARGE_CAP += japanWeight * 0.3;
      weights.COMMODITIES += japanWeight * 0.2;
      weights.REAL_ESTATE += japanWeight * 0.2;
    }

    const remaining = 1 - (usWeight + europeWeight + emWeight + japanWeight);
    if (remaining > 0) {
      weights.GLOBAL_AGG_BOND += remaining * 0.5;
      weights.REAL_ESTATE += remaining * 0.3;
      weights.GOLD += remaining * 0.2;
    }
  }

  if (fund.assetClass === 'fixed_income') {
    const duration = fund.avgDurationYears || 5;
    const bondType = fund.bondType;

    if (duration < 3) {
      weights.GLOBAL_AGG_BOND = 0.7;
      weights.LONG_TREASURY = 0.1;
      weights.HIGH_YIELD_BOND = 0.2;
    } else if (duration > 10) {
      weights.LONG_TREASURY = 0.6;
      weights.GLOBAL_AGG_BOND = 0.3;
      weights.HIGH_YIELD_BOND = 0.1;
    } else {
      weights.GLOBAL_AGG_BOND = 0.5;
      weights.LONG_TREASURY = 0.3;
      weights.HIGH_YIELD_BOND = 0.2;
    }

    if (bondType === 'government') {
      weights.LONG_TREASURY += 0.2;
      weights.GLOBAL_AGG_BOND -= 0.2;
    }
    if (bondType === 'corporate_ig') {
      weights.GLOBAL_AGG_BOND += 0.3;
    }
    if (bondType === 'corporate_hy') {
      weights.HIGH_YIELD_BOND = 0.5;
    }
    if (bondType === 'inflation_linked') {
      weights.GOLD += 0.2;
    }
    if (fund.creditQuality === 'high_yield') {
      weights.HIGH_YIELD_BOND = 0.6;
    }
  }

  if (fund.assetClass === 'real_estate') {
    weights.REAL_ESTATE = 0.7;
    weights.GLOBAL_AGG_BOND = 0.2;
    weights.GOLD = 0.1;
  }

  if (fund.assetClass === 'commodity') {
    weights.COMMODITIES = 0.8;
    weights.GOLD = 0.1;
    weights.REAL_ESTATE = 0.1;
  }

  if (fund.assetClass === 'gold') {
    weights.GOLD = 0.9;
    weights.COMMODITIES = 0.1;
  }

  if (fund.assetClass === 'cash') {
    weights.GLOBAL_AGG_BOND = 0.5;
    weights.LONG_TREASURY = 0.5;
  }

  if (fund.assetClass === 'mixed') {
    const equityWeight = fund.assetBreakdown.equity / 100;
    const fixedWeight = fund.assetBreakdown.fixedIncome / 100;
    const realEstateWeight = fund.assetBreakdown.realEstate / 100;
    const commodityWeight = fund.assetBreakdown.commodity / 100;
    const goldWeight = fund.assetBreakdown.gold / 100;

    const equityProxies = calculateProxyWeights({
      ...fund,
      assetClass: 'equity',
      assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    });

    const fixedProxies = calculateProxyWeights({
      ...fund,
      assetClass: 'fixed_income',
      assetBreakdown: { equity: 0, fixedIncome: 100, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    });

    for (const key of Object.keys(weights) as ProxyKey[]) {
      weights[key] = 
        (equityProxies[key] || 0) * equityWeight +
        (fixedProxies[key] || 0) * fixedWeight +
        (key === 'REAL_ESTATE' ? realEstateWeight : 0) +
        (key === 'COMMODITIES' ? commodityWeight : 0) +
        (key === 'GOLD' ? goldWeight : 0);
    }
  }

  const total = Object.values(weights).reduce((sum, v) => sum + v, 0);
  if (total > 0) {
    for (const key of Object.keys(weights) as ProxyKey[]) {
      weights[key] = weights[key] / total;
    }
  }

  return weights;
}

function calculateFundDrawdown(fund: Fund, crisisKey: CrisisKey): number {
  const proxies = calculateProxyWeights(fund);
  let totalDrawdown = 0;

  for (const [proxyKey, weight] of Object.entries(proxies)) {
    if (weight > 0) {
      const drawdown = getProxyDrawdown(proxyKey as ProxyKey, crisisKey);
      totalDrawdown += weight * drawdown;
    }
  }

  return totalDrawdown;
}

export function runStressTest(portfolio: PortfolioPosition[]): StressTestResult[] {
  return CRISIS_SCENARIOS.map(crisis => {
    const breakdown: StressTestResult['breakdown'] = [];
    let portfolioDrawdown = 0;

    for (const pos of portfolio) {
      const drawdown = calculateFundDrawdown(pos.fund, crisis.key);
      const contribution = (pos.weight / 100) * drawdown;
      portfolioDrawdown += contribution;

      breakdown.push({
        positionName: pos.fund.shortName,
        weight: pos.weight,
        estimatedDrawdown: Number(drawdown.toFixed(1)),
        contribution: Number(contribution.toFixed(2)),
      });
    }

    return {
      crisis,
      portfolioDrawdown: Number(portfolioDrawdown.toFixed(1)),
      breakdown,
    };
  });
}
