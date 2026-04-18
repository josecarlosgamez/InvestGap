import type { AggregatedPortfolio, RiskProfile, Gap } from '../types';

const RULES: Array<(p: AggregatedPortfolio, profile: RiskProfile) => Gap | null> = [
  (p, profile) => {
    const maxSRRI: Record<RiskProfile, number> = { conservative: 3, moderate_conservative: 4, moderate: 5, moderate_aggressive: 6, aggressive: 7 };
    if (p.weightedSRRI > maxSRRI[profile] + 0.5) return {
      type: 'srri_mismatch', severity: 'critical',
      titleES: 'El riesgo de tu cartera no coincide con tu perfil',
      titleEN: 'Your portfolio risk does not match your profile',
      explanationES: `Tu cartera tiene un nivel de riesgo ${p.weightedSRRI}/7, pero tu perfil sugiere máximo ${maxSRRI[profile]}/7.`,
      explanationEN: `Your portfolio has a risk level of ${p.weightedSRRI}/7, but your profile suggests a maximum of ${maxSRRI[profile]}/7.`,
      metric: `SRRI: ${p.weightedSRRI} / 7`,
      worstCrisis: 'gfc_2008_2009'
    };
    return null;
  },
  (p, profile) => {
    if (profile !== 'aggressive' && p.assetBreakdown.fixedIncome < 10) return {
      type: 'no_fixed_income', severity: profile === 'conservative' ? 'critical' : 'moderate',
      titleES: 'Sin renta fija: alta vulnerabilidad en caídas',
      titleEN: 'No fixed income: high vulnerability in downturns',
      explanationES: `Tu cartera tiene solo ${p.assetBreakdown.fixedIncome.toFixed(0)}% en renta fija. Los bonos actúan como amortiguador en crisis.`,
      explanationEN: `Your portfolio has only ${p.assetBreakdown.fixedIncome.toFixed(0)}% in fixed income. Bonds act as a buffer during equity crises.`,
      metric: `Renta fija: ${p.assetBreakdown.fixedIncome.toFixed(0)}%`,
      worstCrisis: 'gfc_2008_2009'
    };
    return null;
  },
  (p) => {
    if ((p.geoExposure.us || 0) > 70) return {
      type: 'us_overweight', severity: 'moderate',
      titleES: 'Concentración excesiva en EE.UU.',
      titleEN: 'Excessive concentration in the US',
      explanationES: `Un ${p.geoExposure.us?.toFixed(0)}% de tu cartera está expuesta a EE.UU. Una recesión americana te afectará desproporcionadamente.`,
      explanationEN: `${p.geoExposure.us?.toFixed(0)}% of your portfolio is exposed to the US. A US recession will hit you disproportionately.`,
      metric: `EE.UU.: ${p.geoExposure.us?.toFixed(0)}%`,
      worstCrisis: 'dotcom_2000_2002'
    };
    return null;
  },
  (p, profile) => {
    if (['aggressive', 'moderate_aggressive'].includes(profile) && (p.geoExposure.emerging_markets || 0) < 5) return {
      type: 'no_emerging_markets', severity: 'minor',
      titleES: 'Sin exposición a mercados emergentes',
      titleEN: 'No exposure to emerging markets',
      explanationES: 'Los mercados emergentes ofrecen mayor potencial de crecimiento a largo plazo.',
      explanationEN: 'Emerging markets offer higher long-term growth potential.',
      metric: `Emergentes: ${p.geoExposure.emerging_markets?.toFixed(0)}%`,
    };
    return null;
  },
  (p) => {
    if ((p.sectorExposure.technology || 0) > 35) return {
      type: 'tech_overweight', severity: 'moderate',
      titleES: 'Sobreexposición al sector tecnológico',
      titleEN: 'Overexposure to the technology sector',
      explanationES: `${p.sectorExposure.technology?.toFixed(0)}% en tecnología. En la crisis puntocom, cayó un 82%.`,
      explanationEN: `${p.sectorExposure.technology?.toFixed(0)}% in technology. During dot-com crash, it fell 82%.`,
      metric: `Tecnología: ${p.sectorExposure.technology?.toFixed(0)}%`,
      worstCrisis: 'dotcom_2000_2002'
    };
    return null;
  },
  (p, profile) => {
    if (!p.hasInflationProtection && ['moderate_conservative', 'moderate', 'moderate_aggressive', 'aggressive'].includes(profile)) return {
      type: 'no_inflation_protection', severity: 'moderate',
      titleES: 'Sin protección contra la inflación',
      titleEN: 'No inflation protection',
      explanationES: 'Tu cartera no tiene activos que suban con la inflación.',
      explanationEN: 'Your portfolio has no assets that rise with inflation.',
      worstCrisis: 'rate_hike_2022'
    };
    return null;
  },
  (p) => {
    if (p.bondDurationYears > 7 && p.assetBreakdown.fixedIncome > 10) return {
      type: 'long_duration_risk', severity: 'moderate',
      titleES: 'Duración elevada en bonos — riesgo de tipos',
      titleEN: 'High bond duration — interest rate risk',
      explanationES: `Tus bonos tienen duración media de ${p.bondDurationYears} años. Cuando suben tipos, caen mucho.`,
      explanationEN: `Your bonds have average duration of ${p.bondDurationYears} years. When rates rise, they fall sharply.`,
      metric: `Duración: ${p.bondDurationYears} años`,
      worstCrisis: 'rate_hike_2022'
    };
    return null;
  },
  (p, profile) => {
    const realAssets = p.assetBreakdown.realEstate + p.assetBreakdown.commodity + p.assetBreakdown.gold;
    if (realAssets < 3 && profile !== 'conservative') return {
      type: 'no_real_assets', severity: 'minor',
      titleES: 'Sin activos reales',
      titleEN: 'No real assets',
      explanationES: 'Los activos reales protegen contra la inflación.',
      explanationEN: 'Real assets protect against inflation.',
      metric: `Activos reales: ${realAssets.toFixed(0)}%`,
      worstCrisis: 'rate_hike_2022'
    };
    return null;
  },
  (p) => {
    if (p.weightedTER > 0.50) return {
      type: 'high_ter', severity: 'minor',
      titleES: 'Costes de gestión elevados',
      titleEN: 'High management costs',
      explanationES: `Tu cartera tiene un coste medio del ${p.weightedTER}%. Se acumula con los años.`,
      explanationEN: `Your portfolio has an average cost of ${p.weightedTER}%. Costs compound over time.`,
      metric: `TER medio: ${p.weightedTER}%`
    };
    return null;
  },
];

export function detectGaps(aggregated: AggregatedPortfolio, profile: RiskProfile): Gap[] {
  const gaps: Gap[] = [];
  for (const rule of RULES) {
    const gap = rule(aggregated, profile);
    if (gap) gaps.push(gap);
  }
  return gaps.sort((a, b) => {
    const order = { critical: 0, moderate: 1, minor: 2 };
    return order[a.severity] - order[b.severity];
  });
}