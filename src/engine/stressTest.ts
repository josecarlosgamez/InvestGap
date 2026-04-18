import type { Fund, PortfolioPosition, CrisisScenario, StressTestResult } from '../types';
import { CRISIS_SCENARIOS } from '../data/crises';

function mapFundToDrawdown(fund: Fund, crisis: CrisisScenario): number {
  const { drawdowns } = crisis;
  const d = drawdowns;

  if (fund.assetClass === 'equity') {
    let equityDrawdown = 0;
    let totalGeo = 0;
    for (const [geo, val] of Object.entries(fund.geoExposure)) {
      totalGeo += val || 0;
    }
    for (const [geo, val] of Object.entries(fund.geoExposure)) {
      const weight = totalGeo > 0 ? (val || 0) / totalGeo : 0;
      if (geo === 'us') equityDrawdown += weight * d.equityUS;
      else if (geo === 'europe') equityDrawdown += weight * d.equityEurope;
      else if (geo === 'emerging_markets') equityDrawdown += weight * d.equityEM;
      else if (geo === 'japan') equityDrawdown += weight * d.equityJapan;
    }

    if ((fund.sectorExposure.technology || 0) > 40) {
      equityDrawdown = (equityDrawdown * 0.6) + (d.equityTech * 0.4);
    }
    if (fund.equityStyle === 'small_cap') {
      equityDrawdown = (equityDrawdown * 0.7) + (d.equitySmallCap * 0.3);
    }
    return equityDrawdown;
  }

  if (fund.assetClass === 'fixed_income') {
    if ((fund.avgDurationYears || 10) < 3) return d.fixedIncomeShortDuration;
    switch (fund.bondType) {
      case 'government': return d.fixedIncomeGov;
      case 'corporate_ig': return d.fixedIncomeCorpIG;
      case 'corporate_hy': return d.fixedIncomeCorpHY;
      case 'inflation_linked': return d.fixedIncomeInflationLinked;
      case 'emerging_market': return d.fixedIncomeEM;
      default: return d.fixedIncomeCorpIG;
    }
  }

  if (fund.assetClass === 'real_estate') return d.realEstate;
  if (fund.assetClass === 'commodity') return d.commodity;
  if (fund.assetClass === 'gold') return d.gold;
  if (fund.assetClass === 'cash') return d.cash;

  if (fund.assetClass === 'mixed') {
    const equityWeight = fund.assetBreakdown.equity / 100;
    const fixedWeight = fund.assetBreakdown.fixedIncome / 100;
    let mixedDrawdown = 0;
    if (equityWeight > 0) {
      let eq = 0;
      for (const [geo, val] of Object.entries(fund.geoExposure)) {
        const totalGeo = Object.values(fund.geoExposure).reduce((s, v) => s + (v || 0), 0);
        const weight = totalGeo > 0 ? (val || 0) / totalGeo : 0;
        if (geo === 'us') eq += weight * d.equityUS;
        else if (geo === 'europe') eq += weight * d.equityEurope;
        else if (geo === 'emerging_markets') eq += weight * d.equityEM;
      }
      mixedDrawdown += equityWeight * eq;
    }
    if (fixedWeight > 0) {
      mixedDrawdown += fixedWeight * d.fixedIncomeGov;
    }
    return mixedDrawdown;
  }

  return 0;
}

export function runStressTest(portfolio: PortfolioPosition[]): StressTestResult[] {
  return CRISIS_SCENARIOS.map(crisis => {
    const breakdown: StressTestResult['breakdown'] = [];
    let portfolioDrawdown = 0;

    for (const pos of portfolio) {
      const drawdown = mapFundToDrawdown(pos.fund, crisis);
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