import type { CrisisKey } from '../types';

export type RiskFactorKey = 
  | 'EQUITY_US_CORE'
  | 'EQUITY_US_GROWTH'
  | 'EQUITY_US_SMALLCAP'
  | 'EQUITY_EUROPE'
  | 'EQUITY_EM'
  | 'FIXED_INCOME_AGG'
  | 'FIXED_INCOME_LONG'
  | 'FIXED_INCOME_HY'
  | 'REAL_ASSETS_REITS'
  | 'REAL_ASSETS_GOLD'
  | 'REAL_ASSETS_COMMOD';

export const RISK_FACTOR_MATRIX: Record<RiskFactorKey, Record<CrisisKey, number>> = {
  EQUITY_US_CORE: {
    great_depression_1929: -89.2,
    oil_shock_stagflation_1973: -48.2,
    black_monday_1987: -33.5,
    asian_crisis_ltcm_1997: -19.3,
    dotcom_2000_2002: -49.1,
    gfc_2008_2009: -55.2,
    eu_debt_2011_2012: -19.4,
    china_commodities_2015: -12.5,
    covid_2020: -33.9,
    rate_hike_2022: -25.4
  },
  EQUITY_US_GROWTH: {
    great_depression_1929: -92.0,
    oil_shock_stagflation_1973: -65.0,
    black_monday_1987: -35.8,
    asian_crisis_ltcm_1997: -18.0,
    dotcom_2000_2002: -82.9,
    gfc_2008_2009: -53.6,
    eu_debt_2011_2012: -16.0,
    china_commodities_2015: -10.2,
    covid_2020: -28.0,
    rate_hike_2022: -35.0
  },
  EQUITY_US_SMALLCAP: {
    great_depression_1929: -90.0,
    oil_shock_stagflation_1973: -45.0,
    black_monday_1987: -35.0,
    asian_crisis_ltcm_1997: -25.0,
    dotcom_2000_2002: -46.0,
    gfc_2008_2009: -58.9,
    eu_debt_2011_2012: -21.0,
    china_commodities_2015: -20.0,
    covid_2020: -41.0,
    rate_hike_2022: -24.0
  },
  EQUITY_EUROPE: {
    great_depression_1929: -77.0,
    oil_shock_stagflation_1973: -73.0,
    black_monday_1987: -36.0,
    asian_crisis_ltcm_1997: -25.0,
    dotcom_2000_2002: -55.0,
    gfc_2008_2009: -58.0,
    eu_debt_2011_2012: -28.0,
    china_commodities_2015: -20.0,
    covid_2020: -37.0,
    rate_hike_2022: -18.0
  },
  EQUITY_EM: {
    great_depression_1929: -95.0,
    oil_shock_stagflation_1973: -42.0,
    black_monday_1987: -35.0,
    asian_crisis_ltcm_1997: -55.0,
    dotcom_2000_2002: -31.0,
    gfc_2008_2009: -61.0,
    eu_debt_2011_2012: -23.0,
    china_commodities_2015: -30.0,
    covid_2020: -32.0,
    rate_hike_2022: -22.0
  },
  FIXED_INCOME_AGG: {
    great_depression_1929: 25.0,
    oil_shock_stagflation_1973: -5.0,
    black_monday_1987: 4.0,
    asian_crisis_ltcm_1997: 6.0,
    dotcom_2000_2002: 15.0,
    gfc_2008_2009: -5.0,
    eu_debt_2011_2012: 5.0,
    china_commodities_2015: 2.0,
    covid_2020: -5.0,
    rate_hike_2022: -16.0
  },
  FIXED_INCOME_LONG: {
    great_depression_1929: 28.0,
    oil_shock_stagflation_1973: -15.0,
    black_monday_1987: 8.0,
    asian_crisis_ltcm_1997: 15.0,
    dotcom_2000_2002: 25.0,
    gfc_2008_2009: 28.0,
    eu_debt_2011_2012: 15.0,
    china_commodities_2015: 5.0,
    covid_2020: 10.0,
    rate_hike_2022: -35.0
  },
  FIXED_INCOME_HY: {
    great_depression_1929: -70.0,
    oil_shock_stagflation_1973: -25.0,
    black_monday_1987: -10.0,
    asian_crisis_ltcm_1997: -20.0,
    dotcom_2000_2002: -25.0,
    gfc_2008_2009: -35.0,
    eu_debt_2011_2012: -12.0,
    china_commodities_2015: -15.0,
    covid_2020: -22.0,
    rate_hike_2022: -15.0
  },
  REAL_ASSETS_REITS: {
    great_depression_1929: -35.0,
    oil_shock_stagflation_1973: -45.0,
    black_monday_1987: -15.0,
    asian_crisis_ltcm_1997: -10.0,
    dotcom_2000_2002: 10.0,
    gfc_2008_2009: -68.0,
    eu_debt_2011_2012: -20.0,
    china_commodities_2015: -5.0,
    covid_2020: -43.0,
    rate_hike_2022: -28.0
  },
  REAL_ASSETS_GOLD: {
    great_depression_1929: 0.0,
    oil_shock_stagflation_1973: 170.0,
    black_monday_1987: 8.0,
    asian_crisis_ltcm_1997: -15.0,
    dotcom_2000_2002: 12.0,
    gfc_2008_2009: -5.0,
    eu_debt_2011_2012: 10.0,
    china_commodities_2015: 5.0,
    covid_2020: -8.0,
    rate_hike_2022: -2.0
  },
  REAL_ASSETS_COMMOD: {
    great_depression_1929: -62.0,
    oil_shock_stagflation_1973: 80.0,
    black_monday_1987: -8.0,
    asian_crisis_ltcm_1997: -32.0,
    dotcom_2000_2002: -5.0,
    gfc_2008_2009: -45.0,
    eu_debt_2011_2012: -15.0,
    china_commodities_2015: -25.0,
    covid_2020: -40.0,
    rate_hike_2022: 25.0
  }
};

export function getRiskFactorDrawdown(factor: RiskFactorKey, crisis: CrisisKey): number {
  return RISK_FACTOR_MATRIX[factor]?.[crisis] ?? 0;
}