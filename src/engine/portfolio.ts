import type { PortfolioPosition, AggregatedPortfolio, Geography, Sector, EquityStyle } from '../types';

export function aggregatePortfolio(positions: PortfolioPosition[]): AggregatedPortfolio {
  const totalWeight = positions.reduce((sum, p) => sum + p.weight, 0);

  const assetBreakdown = { equity: 0, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 };
  const geoExposure: Record<Geography, number> = { us: 0, europe: 0, japan: 0, asia_pacific_ex_japan: 0, emerging_markets: 0, global: 0, spain: 0, eurozone: 0 };
  const sectorExposure: Record<Sector, number> = { technology: 0, financials: 0, healthcare: 0, consumer_discretionary: 0, consumer_staples: 0, industrials: 0, energy: 0, materials: 0, utilities: 0, real_estate: 0, communication: 0, diversified: 0 };
  
  let weightedSRRI = 0;
  let weightedTER = 0;
  let hasInflationProtection = false;
  let hasCurrencyHedging = false;
  let hasShortDuration = false;
  let bondDurationSum = 0;
  let bondWeightSum = 0;
  let bondCreditIg = 0;
  let bondCreditHy = 0;
  let bondCreditGov = 0;
  
  const equityStyleBreakdown: Partial<Record<EquityStyle, number>> = {};
  let geoConcentrationSum = 0;
  let sectorConcentrationSum = 0;

  for (const pos of positions) {
    const w = pos.weight / 100;
    const fund = pos.fund;

    assetBreakdown.equity += w * fund.assetBreakdown.equity;
    assetBreakdown.fixedIncome += w * fund.assetBreakdown.fixedIncome;
    assetBreakdown.realEstate += w * fund.assetBreakdown.realEstate;
    assetBreakdown.commodity += w * fund.assetBreakdown.commodity;
    assetBreakdown.gold += w * fund.assetBreakdown.gold;
    assetBreakdown.cash += w * fund.assetBreakdown.cash;

    weightedSRRI += w * fund.srri;
    if (fund.ter !== null && fund.ter !== undefined) {
      weightedTER += w * fund.ter;
    }

    if (fund.isInflationProtected && pos.weight > 5) hasInflationProtection = true;
    if (fund.currencyHedged && pos.weight > 5) hasCurrencyHedging = true;

    if (fund.assetClass === 'fixed_income' && fund.avgDurationYears) {
      bondDurationSum += w * fund.avgDurationYears;
      bondWeightSum += w;
      
      if (fund.creditQuality === 'investment_grade') bondCreditIg += w * 100;
      else if (fund.creditQuality === 'high_yield') bondCreditHy += w * 100;
      else if (fund.creditQuality === 'government') bondCreditGov += w * 100;
      
      if (fund.avgDurationYears < 3 && pos.weight > 3) hasShortDuration = true;
    }

    if (fund.assetClass === 'equity') {
      for (const [geo, val] of Object.entries(fund.geoExposure)) {
        if (geo in geoExposure) {
          geoExposure[geo as Geography] += w * (val || 0);
          geoConcentrationSum += Math.pow(w * (val || 0), 2);
        }
      }
      for (const [sec, val] of Object.entries(fund.sectorExposure)) {
        if (sec in sectorExposure) {
          sectorExposure[sec as Sector] += w * (val || 0);
          sectorConcentrationSum += Math.pow(w * (val || 0), 2);
        }
      }
      if (fund.equityStyle) {
        equityStyleBreakdown[fund.equityStyle] = (equityStyleBreakdown[fund.equityStyle] || 0) + w * 100;
      }
    }
  }

  const normalizedGeoConc = totalWeight > 0 ? Math.sqrt(geoConcentrationSum) * 10 : 0;
  const normalizedSectorConc = totalWeight > 0 ? Math.sqrt(sectorConcentrationSum) * 10 : 0;

  return {
    totalWeight,
    assetBreakdown,
    geoExposure,
    sectorExposure,
    weightedSRRI: Number(weightedSRRI.toFixed(2)),
    weightedTER: Number(weightedTER.toFixed(3)),
    hasInflationProtection,
    hasCurrencyHedging,
    hasShortDuration,
    bondDurationYears: bondWeightSum > 0 ? Number((bondDurationSum / bondWeightSum).toFixed(1)) : 0,
    bondCreditQuality: { 
      ig: Number(bondCreditIg.toFixed(1)), 
      hy: Number(bondCreditHy.toFixed(1)), 
      gov: Number(bondCreditGov.toFixed(1)) 
    },
    equityStyleBreakdown,
    geographicConcentrationScore: Number(normalizedGeoConc.toFixed(1)),
    sectorConcentrationScore: Number(normalizedSectorConc.toFixed(1)),
  };
}