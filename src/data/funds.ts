import type { Fund } from '../types';

export const FUND_DATABASE: Fund[] = [
  // === GROUP A: ETFs (NOT traspasable in Spain) ===
  
  // Global Equity ETFs
  {
    isin: 'IE00B3RBWM25', name: 'Vanguard FTSE All-World UCITS ETF', shortName: 'VWRL', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 62, europe: 17, japan: 6, asia_pacific_ex_japan: 4, emerging_markets: 11 },
    sectorExposure: { technology: 23, financials: 15, healthcare: 12, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, energy: 5, communication: 8, materials: 4, utilities: 3, real_estate: 2 },
    equityStyle: 'blend', srri: 5, ter: 0.22, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['UCITS','distributing','global','all-world']
  },
  {
    isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World UCITS ETF', shortName: 'IWDA', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 68, europe: 18, japan: 6, asia_pacific_ex_japan: 4, emerging_markets: 0 },
    sectorExposure: { technology: 24, financials: 14, healthcare: 12, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, energy: 5, communication: 8, materials: 4, utilities: 3, real_estate: 2 },
    equityStyle: 'blend', srri: 5, ter: 0.20, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','developed-world','no-EM']
  },
  {
    isin: 'LU1681043599', name: 'Amundi MSCI World UCITS ETF', shortName: 'CW8', provider: 'Amundi', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 68, europe: 18, japan: 6, asia_pacific_ex_japan: 4, emerging_markets: 0 },
    sectorExposure: { technology: 24, financials: 14, healthcare: 12, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, energy: 5, communication: 8, materials: 4, utilities: 3, real_estate: 2 },
    equityStyle: 'blend', srri: 5, ter: 0.38, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','Paris-listed']
  },

  // US Equity ETFs
  {
    isin: 'IE00B3XXRP09', name: 'Vanguard S&P 500 UCITS ETF', shortName: 'VUSA', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 100 },
    sectorExposure: { technology: 31, financials: 13, healthcare: 12, consumer_discretionary: 11, industrials: 8, consumer_staples: 6, energy: 4, communication: 9, materials: 2, utilities: 2, real_estate: 2 },
    equityStyle: 'blend', srri: 6, ter: 0.07, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['UCITS','distributing','S&P500','US-only']
  },
  {
    isin: 'IE00B5BMR087', name: 'iShares Core S&P 500 UCITS ETF', shortName: 'CSPX', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 100 },
    sectorExposure: { technology: 31, financials: 13, healthcare: 12, consumer_discretionary: 11, industrials: 8, consumer_staples: 6, energy: 4, communication: 9, materials: 2, utilities: 2, real_estate: 2 },
    equityStyle: 'blend', srri: 6, ter: 0.07, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','S&P500','US-only']
  },
  {
    isin: 'IE00B3CNHF28', name: 'iShares Nasdaq 100 UCITS ETF', shortName: 'CNDX', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 95, global: 5 },
    sectorExposure: { technology: 55, consumer_discretionary: 17, communication: 16, healthcare: 6, industrials: 3, consumer_staples: 2, financials: 1 },
    equityStyle: 'growth', srri: 7, ter: 0.20, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'aggressive', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','Nasdaq','tech-heavy','growth','high-volatility']
  },

  // European Equity ETFs
  {
    isin: 'IE00B945VV12', name: 'Vanguard FTSE Developed Europe UCITS ETF', shortName: 'VEUR', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { europe: 100 },
    sectorExposure: { financials: 18, healthcare: 14, industrials: 14, consumer_staples: 10, consumer_discretionary: 9, technology: 8, energy: 7, materials: 6, utilities: 6, communication: 5, real_estate: 3 },
    equityStyle: 'blend', srri: 5, ter: 0.10, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','Europe-only']
  },
  {
    isin: 'IE00B4K48X80', name: 'iShares Core MSCI Europe UCITS ETF', shortName: 'IMAE', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { europe: 100 },
    sectorExposure: { financials: 17, healthcare: 14, industrials: 14, consumer_staples: 11, consumer_discretionary: 9, technology: 8, energy: 7, materials: 6, utilities: 6, communication: 5, real_estate: 3 },
    equityStyle: 'blend', srri: 5, ter: 0.12, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','Europe-only']
  },

  // Emerging Markets ETFs
  {
    isin: 'IE00B3VVMM84', name: 'Vanguard FTSE Emerging Markets UCITS ETF', shortName: 'VFEM', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { emerging_markets: 100 },
    sectorExposure: { technology: 22, financials: 20, consumer_discretionary: 14, communication: 10, materials: 8, energy: 7, consumer_staples: 6, industrials: 5, healthcare: 4, utilities: 3, real_estate: 1 },
    equityStyle: 'blend', srri: 6, ter: 0.22, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['UCITS','distributing','EM']
  },
  {
    isin: 'IE00BKM4GZ66', name: 'iShares Core MSCI EM IMI UCITS ETF', shortName: 'EIMI', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { emerging_markets: 100 },
    sectorExposure: { technology: 22, financials: 20, consumer_discretionary: 14, communication: 10, materials: 8, energy: 7, consumer_staples: 6, industrials: 5, healthcare: 4, utilities: 3, real_estate: 1 },
    equityStyle: 'blend', srri: 6, ter: 0.18, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['UCITS','accumulating','EM']
  },

  // Factor ETFs
  {
    isin: 'IE00B0M63177', name: 'iShares Edge MSCI World Value Factor UCITS ETF', shortName: 'IWVL', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 55, europe: 28, japan: 10, asia_pacific_ex_japan: 5, emerging_markets: 2 },
    sectorExposure: { financials: 25, energy: 12, healthcare: 11, consumer_staples: 11, industrials: 10, materials: 8, utilities: 7, consumer_discretionary: 7, technology: 5, communication: 3, real_estate: 1 },
    equityStyle: 'value', srri: 5, ter: 0.30, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['factor','value','smart-beta']
  },
  {
    isin: 'IE00B8FHGS14', name: 'iShares Edge MSCI World Minimum Volatility UCITS ETF', shortName: 'MVOL', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 45, europe: 25, japan: 15, asia_pacific_ex_japan: 8, emerging_markets: 7 },
    sectorExposure: { utilities: 16, consumer_staples: 15, healthcare: 14, financials: 12, communication: 10, industrials: 9, technology: 9, consumer_discretionary: 6, real_estate: 5, energy: 3, materials: 1 },
    equityStyle: 'blend', srri: 4, ter: 0.30, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate_conservative', maxRiskProfile: 'moderate_aggressive', tags: ['factor','min-volatility','defensive','smart-beta']
  },

  // Dividend ETF
  {
    isin: 'IE00B8GKDB10', name: 'Vanguard FTSE All-World High Div Yield UCITS ETF', shortName: 'VHYL', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 42, europe: 25, japan: 11, asia_pacific_ex_japan: 8, emerging_markets: 14 },
    sectorExposure: { financials: 22, energy: 10, healthcare: 11, consumer_staples: 11, industrials: 9, materials: 7, utilities: 8, consumer_discretionary: 7, technology: 7, communication: 5, real_estate: 3 },
    equityStyle: 'dividend', srri: 5, ter: 0.22, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate_conservative', maxRiskProfile: 'moderate_aggressive', tags: ['dividend','income','distributing']
  },

  // Sector ETFs
  {
    isin: 'IE00BGBN6P67', name: 'iShares S&P 500 IT Sector UCITS ETF', shortName: 'IUIT', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 100 },
    sectorExposure: { technology: 100 },
    equityStyle: 'growth', srri: 7, ter: 0.15, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'aggressive', maxRiskProfile: 'aggressive', tags: ['sector','technology','concentrated','high-risk']
  },
  {
    isin: 'IE00B1XNHC34', name: 'iShares Global Clean Energy UCITS ETF', shortName: 'INRG', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 40, europe: 30, asia_pacific_ex_japan: 20, global: 10 },
    sectorExposure: { utilities: 55, industrials: 30, technology: 15 },
    equityStyle: 'growth', srri: 7, ter: 0.65, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'aggressive', maxRiskProfile: 'aggressive', tags: ['sector','clean-energy','ESG','thematic','high-volatility']
  },

  // ESG ETFs
  {
    isin: 'IE00BYX2JD69', name: 'iShares MSCI World ESG Screened UCITS ETF', shortName: 'SAWD', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 65, europe: 18, japan: 7, asia_pacific_ex_japan: 4, emerging_markets: 6 },
    sectorExposure: { technology: 25, financials: 14, healthcare: 13, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, communication: 8, materials: 4, utilities: 4, real_estate: 3, energy: 1 },
    equityStyle: 'blend', srri: 5, ter: 0.20, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['ESG','screened','sustainable','no-fossil-fuels']
  },

  // Fixed Income ETFs
  {
    isin: 'IE00BDBRDM35', name: 'iShares Core Global Aggregate Bond UCITS ETF', shortName: 'AGGG', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'fixed_income', assetBreakdown: { equity: 0, fixedIncome: 100, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 40, europe: 25, japan: 15, asia_pacific_ex_japan: 5, emerging_markets: 10, global: 5 },
    sectorExposure: {},
    bondType: 'mixed_bond', avgDurationYears: 6.5, creditQuality: 'investment_grade',
    srri: 3, ter: 0.10, currency: 'USD', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'conservative', maxRiskProfile: 'moderate_aggressive', tags: ['bonds','global','IG']
  },
  {
    isin: 'IE00B14X4Q57', name: 'iShares € Govt Bond 1-3yr UCITS ETF', shortName: 'IBGS', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'fixed_income', assetBreakdown: { equity: 0, fixedIncome: 100, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { eurozone: 100 },
    sectorExposure: {},
    bondType: 'short_duration', avgDurationYears: 2.0, creditQuality: 'government',
    srri: 2, ter: 0.15, currency: 'EUR', currencyHedged: true, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'conservative', maxRiskProfile: 'moderate', tags: ['bonds','short-duration','EUR','defensive']
  },
  {
    isin: 'IE00B0M62X26', name: 'iShares EUR Inflation Linked Govt Bond UCITS ETF', shortName: 'IBCI', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'fixed_income', assetBreakdown: { equity: 0, fixedIncome: 100, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { eurozone: 100 },
    sectorExposure: {},
    bondType: 'inflation_linked', avgDurationYears: 9.0, creditQuality: 'government',
    srri: 3, ter: 0.09, currency: 'EUR', currencyHedged: true, isInflationProtected: true, isDiversified: true,
    minRiskProfile: 'conservative', maxRiskProfile: 'moderate_aggressive', tags: ['bonds','inflation-linked','EUR','TIPS-equivalent']
  },

  // Real Estate & Commodities ETFs
  {
    isin: 'IE00B1FZS350', name: 'iShares Developed Markets Property Yield UCITS ETF', shortName: 'IWDP', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'real_estate', assetBreakdown: { equity: 0, fixedIncome: 0, realEstate: 100, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 60, europe: 20, japan: 10, asia_pacific_ex_japan: 10 },
    sectorExposure: { real_estate: 100 },
    srri: 5, ter: 0.59, currency: 'USD', currencyHedged: false, isInflationProtected: true, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['REITs','real-assets','inflation-hedge','distributing']
  },
  {
    isin: 'IE00BDFL4P12', name: 'iShares Diversified Commodity Swap UCITS ETF', shortName: 'ICOM', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'commodity', assetBreakdown: { equity: 0, fixedIncome: 0, realEstate: 0, commodity: 100, gold: 0, cash: 0 },
    geoExposure: { global: 100 },
    sectorExposure: {},
    srri: 5, ter: 0.19, currency: 'USD', currencyHedged: false, isInflationProtected: true, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['commodities','diversified','inflation-hedge']
  },
  {
    isin: 'IE00B4ND3602', name: 'iShares Physical Gold ETC', shortName: 'IGLN', provider: 'iShares', fundType: 'etf', vehicleNote: 'ETC — no traspasable fiscalmente en España',
    assetClass: 'gold', assetBreakdown: { equity: 0, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 100, cash: 0 },
    geoExposure: { global: 100 },
    sectorExposure: {},
    srri: 5, ter: 0.12, currency: 'USD', currencyHedged: false, isInflationProtected: true, isDiversified: false,
    minRiskProfile: 'moderate_conservative', maxRiskProfile: 'aggressive', tags: ['gold','physical','safe-haven']
  },

  // Multi-Asset ETFs
  {
    isin: 'IE00BMVB5P51', name: 'Vanguard LifeStrategy 80% Equity UCITS ETF', shortName: 'VNGA80', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'mixed', assetBreakdown: { equity: 80, fixedIncome: 20, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 50, europe: 20, japan: 6, emerging_markets: 9, asia_pacific_ex_japan: 5, global: 10 },
    sectorExposure: { technology: 20, financials: 14, healthcare: 11, consumer_discretionary: 10, industrials: 9, consumer_staples: 6, energy: 5, communication: 7, materials: 4, utilities: 3, real_estate: 2, diversified: 9 },
    equityStyle: 'blend', srri: 4, ter: 0.25, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['multi-asset','all-in-one','80-20']
  },
  {
    isin: 'IE00BMVB5R75', name: 'Vanguard LifeStrategy 60% Equity UCITS ETF', shortName: 'VNGA60', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'mixed', assetBreakdown: { equity: 60, fixedIncome: 40, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 38, europe: 22, japan: 7, emerging_markets: 7, asia_pacific_ex_japan: 4, global: 22 },
    sectorExposure: { technology: 16, financials: 14, healthcare: 11, consumer_discretionary: 9, industrials: 9, consumer_staples: 7, energy: 4, communication: 6, materials: 4, utilities: 4, real_estate: 2, diversified: 14 },
    equityStyle: 'blend', srri: 4, ter: 0.25, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate_conservative', maxRiskProfile: 'moderate_aggressive', tags: ['multi-asset','all-in-one','60-40']
  },
  {
    isin: 'IE00BMVB5S82', name: 'Vanguard LifeStrategy 40% Equity UCITS ETF', shortName: 'VNGA40', provider: 'Vanguard', fundType: 'etf', vehicleNote: 'ETF — no traspasable fiscalmente en España',
    assetClass: 'mixed', assetBreakdown: { equity: 40, fixedIncome: 60, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 25, europe: 25, japan: 7, emerging_markets: 5, asia_pacific_ex_japan: 3, global: 35 },
    sectorExposure: { technology: 12, financials: 14, healthcare: 10, consumer_discretionary: 7, industrials: 8, consumer_staples: 8, energy: 4, communication: 5, materials: 4, utilities: 5, real_estate: 2, diversified: 21 },
    equityStyle: 'blend', srri: 3, ter: 0.25, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'conservative', maxRiskProfile: 'moderate', tags: ['multi-asset','all-in-one','40-60','conservative']
  },

  // === GROUP B: UCITS INDEX FUNDS (TRASPASABLES in Spain) ===
  
  // Vanguard Index Funds
  {
    isin: 'IE0031786142', name: 'Vanguard Global Stock Index Fund EUR Acc', shortName: 'VG Global', provider: 'Vanguard', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 65, europe: 18, japan: 7, asia_pacific_ex_japan: 4, emerging_markets: 6 },
    sectorExposure: { technology: 24, financials: 14, healthcare: 12, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, energy: 5, communication: 8, materials: 4, utilities: 3, real_estate: 2 },
    equityStyle: 'blend', srri: 5, ter: 0.18, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','indexado','MSCI-World','muy-popular-España']
  },
  {
    isin: 'IE0032126645', name: 'Vanguard US 500 Stock Index Fund EUR Acc', shortName: 'VG US 500', provider: 'Vanguard', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 100 },
    sectorExposure: { technology: 31, financials: 13, healthcare: 12, consumer_discretionary: 11, industrials: 8, consumer_staples: 6, energy: 4, communication: 9, materials: 2, utilities: 2, real_estate: 2 },
    equityStyle: 'blend', srri: 6, ter: 0.10, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','indexado','S&P500','muy-popular-España']
  },
  {
    isin: 'IE0007987690', name: 'Vanguard European Stock Index Fund EUR Acc', shortName: 'VG Europe', provider: 'Vanguard', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { europe: 100 },
    sectorExposure: { financials: 18, healthcare: 14, industrials: 14, consumer_staples: 10, consumer_discretionary: 9, technology: 8, energy: 7, materials: 6, utilities: 6, communication: 5, real_estate: 3 },
    equityStyle: 'blend', srri: 5, ter: 0.12, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','indexado','Europa']
  },
  {
    isin: 'IE0031786696', name: 'Vanguard Emerging Markets Stock Index Fund EUR Acc', shortName: 'VG EM', provider: 'Vanguard', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { emerging_markets: 100 },
    sectorExposure: { technology: 22, financials: 20, consumer_discretionary: 14, communication: 10, materials: 8, energy: 7, consumer_staples: 6, industrials: 5, healthcare: 4, utilities: 3, real_estate: 1 },
    equityStyle: 'blend', srri: 6, ter: 0.23, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','indexado','mercados-emergentes']
  },
  {
    isin: 'IE00B18GC888', name: 'Vanguard Global Bond Index Fund EUR Hedged Acc', shortName: 'VG Bond', provider: 'Vanguard', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'fixed_income', assetBreakdown: { equity: 0, fixedIncome: 100, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 40, europe: 25, japan: 15, asia_pacific_ex_japan: 5, emerging_markets: 10, global: 5 },
    sectorExposure: {},
    bondType: 'mixed_bond', avgDurationYears: 6.5, creditQuality: 'investment_grade',
    srri: 3, ter: 0.15, currency: 'EUR', currencyHedged: true, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'conservative', maxRiskProfile: 'moderate_aggressive', tags: ['fondo','traspasable','indexado','bonos','globales','muy-popular-España']
  },

  // Amundi Index Funds
  {
    isin: 'LU0996182563', name: 'Amundi Index MSCI World EUR Acc', shortName: 'Amundi World', provider: 'Amundi', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 68, europe: 18, japan: 6, asia_pacific_ex_japan: 4, emerging_markets: 0 },
    sectorExposure: { technology: 24, financials: 14, healthcare: 12, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, energy: 5, communication: 8, materials: 4, utilities: 3, real_estate: 2 },
    equityStyle: 'blend', srri: 5, ter: 0.30, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','indexado','muy-popular-España']
  },
  {
    isin: 'LU0996179007', name: 'Amundi Index S&P 500 EUR Acc', shortName: 'Amundi S&P 500', provider: 'Amundi', fundType: 'index_fund', vehicleNote: 'Fondo indexado TRASPASABLE — sin coste fiscal al cambiar',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 100 },
    sectorExposure: { technology: 31, financials: 13, healthcare: 12, consumer_discretionary: 11, industrials: 8, consumer_staples: 6, energy: 4, communication: 9, materials: 2, utilities: 2, real_estate: 2 },
    equityStyle: 'blend', srri: 6, ter: 0.30, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','indexado','S&P500']
  },

  // === GROUP C: UCITS ACTIVE FUNDS (TRASPASABLES in Spain) ===
  
  // International Active Funds
  {
    isin: 'GB00B41YBW71', name: 'Fundsmith Equity Fund T EUR Acc', shortName: 'Fundsmith', provider: 'Fundsmith', fundType: 'active_fund', vehicleNote: 'Fondo activo TRASPASABLE — disponible vía MyInvestor',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 65, europe: 20, global: 15 },
    sectorExposure: { consumer_staples: 30, healthcare: 25, technology: 25, consumer_discretionary: 12, industrials: 8 },
    equityStyle: 'growth', srri: 5, ter: 1.05, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','quality-growth','Terry-Smith','concentrado-25-valores']
  },
  {
    isin: 'LU0552385295', name: 'Morgan Stanley INVF Global Opportunity Fund Z', shortName: 'MS Global Opp', provider: 'Morgan Stanley', fundType: 'active_fund', vehicleNote: 'Fondo activo TRASPASABLE — disponible vía MyInvestor',
    assetClass: 'equity', assetBreakdown: { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { us: 55, europe: 20, asia_pacific_ex_japan: 15, global: 10 },
    sectorExposure: { technology: 35, consumer_discretionary: 22, healthcare: 18, financials: 12, industrials: 8, communication: 5 },
    equityStyle: 'growth', srri: 6, ter: 0.85, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','growth','muy-popular-España','alta-volatilidad']
  },
  {
    isin: 'LU0141799501', name: 'Nordea 1 Stable Return Fund BI EUR', shortName: 'Nordea Stable', provider: 'Nordea', fundType: 'active_fund', vehicleNote: 'Fondo activo TRASPASABLE — disponible vía MyInvestor',
    assetClass: 'mixed', assetBreakdown: { equity: 50, fixedIncome: 40, realEstate: 0, commodity: 5, gold: 5, cash: 0 },
    geoExposure: { us: 35, europe: 35, global: 30 },
    sectorExposure: { consumer_staples: 15, healthcare: 12, utilities: 10, industrials: 10, financials: 10, technology: 8, energy: 8, communication: 7, consumer_discretionary: 7, materials: 7, real_estate: 6 },
    equityStyle: 'blend', srri: 4, ter: 0.75, currency: 'EUR', currencyHedged: true, isInflationProtected: false, isDiversified: true,
    minRiskProfile: 'conservative', maxRiskProfile: 'moderate_aggressive', tags: ['fondo','traspasable','activo','mixto','defensivo','muy-popular-España','baja-volatilidad']
  },

  // Spanish Value Investing Funds
  {
    isin: 'ES0182769002', name: 'Cobas Internacional FI', shortName: 'Cobas Intl', provider: 'Cobas AM', fundType: 'active_fund', vehicleNote: 'Fondo español TRASPASABLE — García Paramés, value investing',
    assetClass: 'equity', assetBreakdown: { equity: 95, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 5 },
    geoExposure: { europe: 45, us: 20, emerging_markets: 20, global: 15 },
    sectorExposure: { energy: 25, materials: 20, consumer_discretionary: 18, industrials: 15, financials: 12, technology: 5, consumer_staples: 5 },
    equityStyle: 'value', srri: 6, ter: 1.75, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','value','español','García-Paramés','concentrado','alta-volatilidad']
  },
  {
    isin: 'ES0180866002', name: 'azValor Internacional FI', shortName: 'azValor Intl', provider: 'azValor', fundType: 'active_fund', vehicleNote: 'Fondo español TRASPASABLE — value investing, materias primas',
    assetClass: 'equity', assetBreakdown: { equity: 95, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 5 },
    geoExposure: { us: 30, europe: 30, emerging_markets: 25, global: 15 },
    sectorExposure: { energy: 35, materials: 25, industrials: 15, consumer_discretionary: 12, financials: 8, consumer_staples: 5 },
    equityStyle: 'value', srri: 6, ter: 1.88, currency: 'EUR', currencyHedged: false, isInflationProtected: true, isDiversified: false,
    minRiskProfile: 'aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','value','español','materias-primas','alta-volatilidad']
  },
  {
    isin: 'ES0180860003', name: 'Magallanes European Equity M FI', shortName: 'Magallanes EU', provider: 'Magallanes', fundType: 'active_fund', vehicleNote: 'Fondo español TRASPASABLE — value investing europeo',
    assetClass: 'equity', assetBreakdown: { equity: 95, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 5 },
    geoExposure: { europe: 90, global: 10 },
    sectorExposure: { industrials: 25, consumer_discretionary: 20, financials: 18, materials: 12, consumer_staples: 10, energy: 8, technology: 7 },
    equityStyle: 'value', srri: 5, ter: 1.50, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','value','español','Europa']
  },
  {
    isin: 'ES0110132001', name: 'Bestinver Internacional FI', shortName: 'Bestinver Intl', provider: 'Bestinver', fundType: 'active_fund', vehicleNote: 'Fondo español TRASPASABLE — value investing, gestora histórica española',
    assetClass: 'equity', assetBreakdown: { equity: 95, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 5 },
    geoExposure: { europe: 60, us: 20, global: 20 },
    sectorExposure: { industrials: 22, consumer_discretionary: 18, financials: 15, technology: 12, materials: 10, healthcare: 10, consumer_staples: 8, energy: 5 },
    equityStyle: 'value', srri: 5, ter: 1.75, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'moderate_aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','value','español','gestora-histórica']
  },
  {
    isin: 'ES0180839007', name: 'True Value FI', shortName: 'True Value', provider: 'Renta 4', fundType: 'active_fund', vehicleNote: 'Fondo español TRASPASABLE — small & mid cap value',
    assetClass: 'equity', assetBreakdown: { equity: 90, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 10 },
    geoExposure: { us: 40, europe: 40, global: 20 },
    sectorExposure: { consumer_discretionary: 25, technology: 20, industrials: 18, financials: 15, healthcare: 12, materials: 7, consumer_staples: 3 },
    equityStyle: 'small_cap', srri: 6, ter: 1.35, currency: 'EUR', currencyHedged: false, isInflationProtected: false, isDiversified: false,
    minRiskProfile: 'aggressive', maxRiskProfile: 'aggressive', tags: ['fondo','traspasable','activo','small-cap','value','español']
  },
];