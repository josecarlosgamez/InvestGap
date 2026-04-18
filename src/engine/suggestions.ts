import type { Gap, PortfolioPosition, RiskProfile, Fund, FundSuggestion, GapType } from '../types';

function buildReasonES(fund: Fund, gap: Gap): string {
  const reasons: Record<string, string> = {
    no_fixed_income: `Añade diversificación con bonos globales`,
    us_overweight: `Reduce concentración en EE.UU. con exposición europea`,
    no_emerging_markets: `Acceso a mercados emergentes`,
    tech_overweight: `Menor exposición tecnológica`,
    no_inflation_protection: `Protección contra inflación`,
    long_duration_risk: `Duración baja, menor riesgo de tipos`,
    no_real_assets: `Exposición a activos reales`,
    srri_mismatch: `Perfil de riesgo más bajo`,
    no_gold_or_commodity: `Protección alternativa`,
  };
  return reasons[gap.type] || `Fondo مناسب para cubrir este hueco`;
}

function buildReasonEN(fund: Fund, gap: Gap): string {
  const reasons: Record<string, string> = {
    no_fixed_income: `Adds diversification with global bonds`,
    us_overweight: `Reduces US concentration with European exposure`,
    no_emerging_markets: `Access to emerging markets`,
    tech_overweight: `Lower tech exposure`,
    no_inflation_protection: `Inflation protection`,
    long_duration_risk: `Lower duration, less rate risk`,
    no_real_assets: `Real asset exposure`,
    srri_mismatch: `Lower risk profile`,
    no_gold_or_commodity: `Alternative protection`,
  };
  return reasons[gap.type] || `Fund suitable for this gap`;
}

export function generateSuggestions(
  gaps: Gap[],
  portfolio: PortfolioPosition[],
  profile: RiskProfile,
  allFunds: Fund[]
): FundSuggestion[] {
  const existingISINs = new Set(portfolio.map(p => p.fund.isin));
  const candidates = allFunds.filter(f => !existingISINs.has(f.isin));

  const profileOrder: RiskProfile[] = ['conservative', 'moderate_conservative', 'moderate', 'moderate_aggressive', 'aggressive'];
  const profileIndex = profileOrder.indexOf(profile);
  const compatible = candidates.filter(f => 
    profileOrder.indexOf(f.minRiskProfile) <= profileIndex &&
    profileOrder.indexOf(f.maxRiskProfile) >= profileIndex
  );

  const gapToFundFilter: Record<GapType, (f: Fund) => boolean> = {
    no_fixed_income: f => f.assetClass === 'fixed_income' && f.bondType === 'mixed_bond',
    no_bonds_moderate_profile: f => f.assetClass === 'fixed_income',
    geographic_concentration: f => f.isDiversified && f.assetClass === 'equity',
    us_overweight: f => f.assetClass === 'equity' && (f.geoExposure.europe || 0) > 50,
    no_emerging_markets: f => f.assetClass === 'equity' && (f.geoExposure.emerging_markets || 0) > 50,
    sector_concentration: f => f.isDiversified,
    tech_overweight: f => f.assetClass === 'equity' && (f.sectorExposure.technology || 0) < 15,
    no_inflation_protection: f => f.isInflationProtected,
    long_duration_risk: f => f.assetClass === 'fixed_income' && (f.avgDurationYears || 10) < 3,
    no_real_assets: f => ['real_estate', 'commodity', 'gold'].includes(f.assetClass),
    no_defensive_layer: f => f.assetClass === 'fixed_income' && f.srri <= 3,
    currency_risk: f => f.currencyHedged,
    high_ter: f => (f.ter ?? 1) < 0.25,
    srri_mismatch: f => f.assetClass === 'fixed_income' || f.isDiversified,
    no_gold_or_commodity: f => ['commodity', 'gold'].includes(f.assetClass),
    single_provider_risk: f => true,
  };

  const suggestions: FundSuggestion[] = [];
  const usedISINs = new Set<string>();

  for (const gap of gaps) {
    const filter = gapToFundFilter[gap.type];
    if (!filter) continue;
    
    const matches = compatible
      .filter(filter)
      .filter(f => !usedISINs.has(f.isin))
      .sort((a, b) => (a.ter ?? 1) - (b.ter ?? 1))
      .slice(0, 2);

    for (const fund of matches) {
      usedISINs.add(fund.isin);
      suggestions.push({
        fund,
        addressesGaps: [gap.type],
        correlationWithPortfolio: 'low',
        reasonES: buildReasonES(fund, gap),
        reasonEN: buildReasonEN(fund, gap),
        suggestedWeight: gap.severity === 'critical' ? 15 : gap.severity === 'moderate' ? 10 : 5
      });
    }
  }

  return suggestions.slice(0, 6);
}