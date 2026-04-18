import type { CrisisKey } from '../types';

export type ProxyKey = 
  | 'US_LARGE_CAP'
  | 'US_TECH_GROWTH'
  | 'EUROPE_EQUITY'
  | 'EM_EQUITY'
  | 'GLOBAL_AGG_BOND'
  | 'LONG_TREASURY'
  | 'HIGH_YIELD_BOND'
  | 'GOLD'
  | 'COMMODITIES'
  | 'REAL_ESTATE';

export const PROXY_DATA: Record<ProxyKey, Partial<Record<CrisisKey, number>>> = {
  US_LARGE_CAP: {
    dotcom_2000_2002: -49.1, gfc_2008_2009: -55.2, eu_debt_2011_2012: -19.4, covid_2020: -33.9, rate_hike_2022: -25.4,
  },
  US_TECH_GROWTH: {
    dotcom_2000_2002: -82.9, gfc_2008_2009: -53.6, eu_debt_2011_2012: -16.0, covid_2020: -28.0, rate_hike_2022: -35.0,
  },
  EUROPE_EQUITY: {
    dotcom_2000_2002: -55.0, gfc_2008_2009: -58.0, eu_debt_2011_2012: -28.0, covid_2020: -37.0, rate_hike_2022: -18.0,
  },
  EM_EQUITY: {
    dotcom_2000_2002: -31.0, gfc_2008_2009: -61.0, eu_debt_2011_2012: -23.0, covid_2020: -32.0, rate_hike_2022: -22.0,
  },
  GLOBAL_AGG_BOND: {
    dotcom_2000_2002: 15.0, gfc_2008_2009: -5.0, eu_debt_2011_2012: 5.0, covid_2020: -5.0, rate_hike_2022: -16.0,
  },
  LONG_TREASURY: {
    dotcom_2000_2002: 25.0, gfc_2008_2009: 28.0, eu_debt_2011_2012: 15.0, covid_2020: 10.0, rate_hike_2022: -35.0,
  },
  HIGH_YIELD_BOND: {
    dotcom_2000_2002: -25.0, gfc_2008_2009: -35.0, eu_debt_2011_2012: -12.0, covid_2020: -22.0, rate_hike_2022: -15.0,
  },
  GOLD: {
    dotcom_2000_2002: 12.0, gfc_2008_2009: -5.0, eu_debt_2011_2012: 10.0, covid_2020: -8.0, rate_hike_2022: -2.0,
  },
  COMMODITIES: {
    dotcom_2000_2002: -5.0, gfc_2008_2009: -45.0, eu_debt_2011_2012: -15.0, covid_2020: -40.0, rate_hike_2022: 25.0,
  },
  REAL_ESTATE: {
    dotcom_2000_2002: 10.0, gfc_2008_2009: -68.0, eu_debt_2011_2012: -20.0, covid_2020: -43.0, rate_hike_2022: -28.0,
  }
};

export function getProxyDrawdown(proxy: ProxyKey, crisis: CrisisKey): number {
  return PROXY_DATA[proxy]?.[crisis] ?? 0;
}
