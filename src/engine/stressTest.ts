import type { Fund, PortfolioPosition, StressTestResult, CrisisKey } from '../types';
import { CRISIS_SCENARIOS } from '../data/crises';
import { type ProxyKey, getProxyDrawdown } from '../data/proxies';

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

export function calculateProxyCorrelations(fund: Fund): ProxyWeights {
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

  const equityPct = fund.assetBreakdown.equity / 100;
  const fixedIncomePct = fund.assetBreakdown.fixedIncome / 100;
  const realEstatePct = fund.assetBreakdown.realEstate / 100;
  const goldPct = fund.assetBreakdown.gold / 100;
  const commodityPct = fund.assetBreakdown.commodity / 100;

  if (equityPct > 0) {
    const geo = fund.geoExposure;
    const totalGeo = (geo.us || 0) + (geo.europe || 0) + (geo.japan || 0) + (geo.emerging_markets || 0) + (geo.global || 0) + (geo.asia_pacific_ex_japan || 0) + (geo.spain || 0) + (geo.eurozone || 0);
    
    if (totalGeo === 0) {
      weights.US_LARGE_CAP += equityPct * 0.5;
      weights.EUROPE_EQUITY += equityPct * 0.25;
      weights.EM_EQUITY += equityPct * 0.25;
    } else {
      const usGeoPct = (geo.us || 0) / totalGeo;
      const europeGeoPct = (geo.europe || 0) / totalGeo;
      const emGeoPct = (geo.emerging_markets || 0) / totalGeo;
      const japanGeoPct = (geo.japan || 0) / totalGeo;

      const usWeight = usGeoPct + japanGeoPct * 0.5;
      const europeWeight = europeGeoPct + japanGeoPct * 0.5;

      const techPct = (fund.sectorExposure.technology || 0) / 100;
      const usEquityAlloc = equityPct * usWeight;
      const techShift = techPct * usEquityAlloc;
      const usLargeCapRemainder = usEquityAlloc - techShift;

      weights.US_TECH_GROWTH += techShift;
      weights.US_LARGE_CAP += usLargeCapRemainder;
      weights.EUROPE_EQUITY += equityPct * europeWeight;
      weights.EM_EQUITY += equityPct * emGeoPct;
    }
  }

  if (fixedIncomePct > 0) {
    if (fund.bondType === 'corporate_hy') {
      weights.HIGH_YIELD_BOND = fixedIncomePct;
    } else if ((fund.avgDurationYears || 0) >= 10) {
      weights.LONG_TREASURY = fixedIncomePct;
    } else {
      weights.GLOBAL_AGG_BOND = fixedIncomePct;
    }
  }

  weights.REAL_ESTATE += realEstatePct;
  weights.GOLD += goldPct;
  weights.COMMODITIES += commodityPct;

  const cashPct = fund.assetBreakdown.cash / 100;
  const totalRiskAssets = 1 - cashPct;

  if (totalRiskAssets > 0 && totalRiskAssets < 1) {
    for (const key of Object.keys(weights) as ProxyKey[]) {
      weights[key] = weights[key] / totalRiskAssets;
    }
  }

  return weights;
}

export function calculateFundDrawdown(fund: Fund, crisisKey: CrisisKey): number {
  const proxies = calculateProxyCorrelations(fund);
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
