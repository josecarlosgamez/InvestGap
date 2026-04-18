import type { Fund, PortfolioPosition, StressTestResult, CrisisKey } from '../types';
import { CRISIS_SCENARIOS } from '../data/crises';
import { RISK_FACTOR_MATRIX, type RiskFactorKey, getRiskFactorDrawdown } from '../data/riskFactors';

export type FactorExposures = Record<RiskFactorKey, number>;

export function calculateFactorExposures(fund: Fund): FactorExposures {
  const exposures: FactorExposures = {
    EQUITY_US_CORE: 0, EQUITY_US_GROWTH: 0, EQUITY_US_SMALLCAP: 0, EQUITY_EUROPE: 0, EQUITY_EM: 0,
    FIXED_INCOME_AGG: 0, FIXED_INCOME_LONG: 0, FIXED_INCOME_HY: 0,
    REAL_ASSETS_REITS: 0, REAL_ASSETS_GOLD: 0, REAL_ASSETS_COMMOD: 0
  };

  const { equity, fixedIncome, realEstate, gold, commodity, cash } = fund.assetBreakdown;
  const netEquity = equity / 100;
  const netFixedIncome = fixedIncome / 100;
  const netRealEstate = realEstate / 100;
  const netGold = gold / 100;
  const netCommod = commodity / 100;
  const cashPct = cash / 100;

  if (netEquity > 0) {
    const geo = fund.geoExposure;
    const totalGeo = (geo.us || 0) + (geo.europe || 0) + (geo.japan || 0) + (geo.emerging_markets || 0) + (geo.global || 0) + (geo.asia_pacific_ex_japan || 0) + (geo.spain || 0) + (geo.eurozone || 0);
    
    let usWeight = 0, euWeight = 0, emWeight = 0;
    
    if (totalGeo > 0) {
      usWeight = (geo.us || 0) / totalGeo;
      euWeight = (geo.europe || 0) / totalGeo;
      emWeight = (geo.emerging_markets || 0) / totalGeo;
      const jpWeight = (geo.japan || 0) / totalGeo;
      usWeight += jpWeight * 0.4;
      euWeight += jpWeight * 0.6;
    } else {
      usWeight = 0.5;
      euWeight = 0.25;
      emWeight = 0.25;
    }

    const isSmallCap = fund.equityStyle === 'small_cap';
    const techPct = (fund.sectorExposure.technology || 0) / 100;
    const usEquityAlloc = netEquity * usWeight;
    const euEquityAlloc = netEquity * euWeight;
    const emEquityAlloc = netEquity * emWeight;

    if (isSmallCap) {
      exposures.EQUITY_US_SMALLCAP += usEquityAlloc;
      exposures.EQUITY_US_CORE += usEquityAlloc * 0.2;
    } else if (techPct > 0.35) {
      const growthLoading = techPct;
      exposures.EQUITY_US_GROWTH += usEquityAlloc * growthLoading;
      exposures.EQUITY_US_CORE += usEquityAlloc * (1 - growthLoading);
    } else {
      exposures.EQUITY_US_CORE += usEquityAlloc;
    }

    exposures.EQUITY_EUROPE += euEquityAlloc;
    exposures.EQUITY_EM += emEquityAlloc;
  }

  if (netFixedIncome > 0) {
    if (fund.bondType === 'corporate_hy') {
      exposures.FIXED_INCOME_HY += netFixedIncome;
    } else {
      const duration = fund.avgDurationYears || 0;
      if (duration >= 10) {
        const intensity = Math.min(duration / 25, 1);
        exposures.FIXED_INCOME_LONG += netFixedIncome * intensity;
        exposures.FIXED_INCOME_AGG += netFixedIncome * (1 - intensity);
      } else {
        exposures.FIXED_INCOME_AGG += netFixedIncome;
      }
    }
  }

  exposures.REAL_ASSETS_REITS += netRealEstate;
  exposures.REAL_ASSETS_GOLD += netGold;
  exposures.REAL_ASSETS_COMMOD += netCommod;

  const totalRiskAssets = 1 - cashPct;
  if (totalRiskAssets > 0 && totalRiskAssets < 1) {
    const scale = 1 / totalRiskAssets;
    for (const key of Object.keys(exposures) as RiskFactorKey[]) {
      exposures[key] *= scale;
    }
  }

  return exposures;
}

export function calculateFundDrawdown(fund: Fund, crisisKey: CrisisKey): number {
  const exposures = calculateFactorExposures(fund);
  let totalDrawdown = 0;

  for (const [key, loading] of Object.entries(exposures)) {
    if (loading > 0) {
      const drawdown = getRiskFactorDrawdown(key as RiskFactorKey, crisisKey);
      totalDrawdown += loading * drawdown;
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