export type RiskProfile =
  | 'conservative'
  | 'moderate_conservative'
  | 'moderate'
  | 'moderate_aggressive'
  | 'aggressive';

export interface QuestionnaireAnswers {
  timeHorizon: 1 | 2 | 3 | 4 | 5;
  reactionToLoss: 1 | 2 | 3 | 4 | 5;
  primaryGoal: 'emergency' | 'house' | 'retirement' | 'wealth';
  needsWithdrawals: boolean;
  ageRange: 'under30' | '30to45' | '45to55' | '55to65' | 'over65';
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
}

export type AssetClass =
  | 'equity'
  | 'fixed_income'
  | 'real_estate'
  | 'commodity'
  | 'gold'
  | 'cash'
  | 'mixed';

export type Geography =
  | 'us'
  | 'europe'
  | 'japan'
  | 'asia_pacific_ex_japan'
  | 'emerging_markets'
  | 'global'
  | 'spain'
  | 'eurozone';

export type Sector =
  | 'technology'
  | 'financials'
  | 'healthcare'
  | 'consumer_discretionary'
  | 'consumer_staples'
  | 'industrials'
  | 'energy'
  | 'materials'
  | 'utilities'
  | 'real_estate'
  | 'communication'
  | 'diversified';

export type BondType =
  | 'government'
  | 'corporate_ig'
  | 'corporate_hy'
  | 'inflation_linked'
  | 'emerging_market'
  | 'short_duration'
  | 'mixed_bond';

export type EquityStyle = 'growth' | 'value' | 'blend' | 'dividend' | 'small_cap';

export type FundType = 'etf' | 'index_fund' | 'active_fund';

export interface Fund {
  isin: string;
  name: string;
  shortName: string;
  provider: string;
  fundType: FundType;
  vehicleNote: string;
  yahooTicker?: string;
  assetClass: AssetClass;
  assetBreakdown: {
    equity: number;
    fixedIncome: number;
    realEstate: number;
    commodity: number;
    gold: number;
    cash: number;
  };
  geoExposure: Partial<Record<Geography, number>>;
  sectorExposure: Partial<Record<Sector, number>>;
  bondType?: BondType;
  avgDurationYears?: number;
  creditQuality?: 'investment_grade' | 'high_yield' | 'mixed' | 'government';
  equityStyle?: EquityStyle;
  srri: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  ter: number | null;
  currency: string;
  currencyHedged: boolean;
  isInflationProtected: boolean;
  isDiversified: boolean;
  minRiskProfile: RiskProfile;
  maxRiskProfile: RiskProfile;
  tags: string[];
}

export interface PortfolioPosition {
  fund: Fund;
  weight: number;
}

export interface AggregatedPortfolio {
  totalWeight: number;
  assetBreakdown: {
    equity: number;
    fixedIncome: number;
    realEstate: number;
    commodity: number;
    gold: number;
    cash: number;
  };
  geoExposure: Record<Geography, number>;
  sectorExposure: Record<Sector, number>;
  weightedSRRI: number;
  weightedTER: number;
  hasInflationProtection: boolean;
  hasCurrencyHedging: boolean;
  hasShortDuration: boolean;
  bondDurationYears: number;
  bondCreditQuality: { ig: number; hy: number; gov: number };
  equityStyleBreakdown: Partial<Record<EquityStyle, number>>;
  geographicConcentrationScore: number;
  sectorConcentrationScore: number;
}

export type CrisisKey =
  | 'great_depression_1929'
  | 'oil_shock_stagflation_1973'
  | 'black_monday_1987'
  | 'asian_crisis_ltcm_1997'
  | 'dotcom_2000_2002'
  | 'gfc_2008_2009'
  | 'eu_debt_2011_2012'
  | 'china_commodities_2015'
  | 'covid_2020'
  | 'rate_hike_2022';

export interface CrisisScenario {
  key: CrisisKey;
  nameES: string;
  nameEN: string;
  period: string;
  century: '20th' | '21st';
  recoveryYears: number;
  keyLesson: { es: string; en: string };
  descriptionES: string;
  descriptionEN: string;
  drawdowns: {
    equityUS: number;
    equityEurope: number;
    equityEM: number;
    equityJapan: number;
    equityTech: number;
    equityFinancials: number;
    equityEnergy: number;
    equityHealthcare: number;
    equitySmallCap: number;
    fixedIncomeGov: number;
    fixedIncomeCorpIG: number;
    fixedIncomeCorpHY: number;
    fixedIncomeInflationLinked: number;
    fixedIncomeEM: number;
    fixedIncomeShortDuration: number;
    realEstate: number;
    commodity: number;
    gold: number;
    cash: number;
  };
}

export interface StressTestResult {
  crisis: CrisisScenario;
  portfolioDrawdown: number;
  breakdown: Array<{
    positionName: string;
    weight: number;
    estimatedDrawdown: number;
    contribution: number;
  }>;
}

export type GapSeverity = 'critical' | 'moderate' | 'minor';

export type GapType =
  | 'no_fixed_income'
  | 'no_bonds_moderate_profile'
  | 'geographic_concentration'
  | 'us_overweight'
  | 'no_emerging_markets'
  | 'sector_concentration'
  | 'tech_overweight'
  | 'no_inflation_protection'
  | 'long_duration_risk'
  | 'no_real_assets'
  | 'no_defensive_layer'
  | 'currency_risk'
  | 'high_ter'
  | 'srri_mismatch'
  | 'no_gold_or_commodity'
  | 'single_provider_risk';

export interface Gap {
  type: GapType;
  severity: GapSeverity;
  titleES: string;
  titleEN: string;
  explanationES: string;
  explanationEN: string;
  metric?: string;
  worstCrisis?: CrisisKey;
}

export interface FundSuggestion {
  fund: Fund;
  addressesGaps: GapType[];
  correlationWithPortfolio: 'low' | 'medium';
  reasonES: string;
  reasonEN: string;
  suggestedWeight: number;
}

export interface AppState {
  currentStep: 1 | 2 | 3 | 4;
  questionnaire: QuestionnaireAnswers | null;
  riskProfile: RiskProfile | null;
  portfolio: PortfolioPosition[];
  aggregated: AggregatedPortfolio | null;
  stressResults: StressTestResult[];
  gaps: Gap[];
  suggestions: FundSuggestion[];
}