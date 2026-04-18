import type { Fund } from '../types';

export interface YahooFundData {
  ticker: string;
  name: string;
  assetAllocation: {
    stock: number;
    bond: number;
    cash: number;
    other: number;
  };
  sectorWeightings: Record<string, number>;
  keyMetrics: {
    beta: number;
    stdDev: number;
    sharpeRatio: number;
    ter: number;
    yield: number;
  };
  topHoldings: { name: string; weight: number }[];
}

export const YAHOO_TICKER_MAP: Record<string, string> = {
  'VWRL': 'VWRL.AS',
  'IWDA': 'IWDA.AS',
  'CW8': 'CW8.PA',
  'VUSA': 'VUSA.AS',
  'CSPX': 'CSPX.AS',
  'CNDX': 'CNDX.AS',
  'VEUR': 'VEUR.AS',
  'IMAE': 'IMAE.AS',
  'VFEM': 'VFEM.AS',
  'VGEK': 'VGEK.AS',
  'IEMG': 'IEMG.AS',
  'VRF': 'VRF.AS',
  'IAGG': 'IAGG.AS',
  'IGLA': 'IGLA.AS',
  'CASH': 'CASH.AS',
  'GLD': 'GLD',
  'IAU': 'IAU',
  'SLV': 'SLV',
  'DBK': 'DBK.DE',
  'SAN': 'SAN.MC',
  'BBVA': 'BBVA.MC',
  'SCHD': 'SCHD',
  'VIG': 'VIG',
  'JEPI': 'JEPI',
  'JEPQ': 'JEPQ',
  'KO': 'KO',
  'PG': 'PG',
  'PEP': 'PEP',
  'JNJ': 'JNJ',
  'UNH': 'UNH',
  'V': 'V',
  'MA': 'MA',
  'MSFT': 'MSFT',
  'AAPL': 'AAPL',
  'NVDA': 'NVDA',
  'GOOGL': 'GOOGL',
  'AMZN': 'AMZN',
  'META': 'META',
  'TSLA': 'TSLA',
};

export function getYahooTicker(fundNameOrTicker: string): string | null {
  const normalized = fundNameOrTicker.toUpperCase().trim();
  
  if (YAHOO_TICKER_MAP[normalized]) {
    return YAHOO_TICKER_MAP[normalized];
  }
  
  for (const [ticker, yahoo] of Object.entries(YAHOO_TICKER_MAP)) {
    if (ticker.toLowerCase() === normalized.toLowerCase()) {
      return yahoo;
    }
  }
  
  return null;
}

export interface YahooSearchResult {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  assetType: string;
}

export async function searchYahooFunds(query: string): Promise<YahooSearchResult[]> {
  if (!query || query.length < 1) return [];
  
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10&newsCount=0&enableFuzzyQuery=false&quotesQueryId=00000000-00000000-00000000-00000000-00000000-00000000-00000000-00000000-00000000-00000000`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data?.quotes) {
      return data.quotes
        .filter((q: any) => q.quoteType === 'ETF' || q.quoteType === 'MUTETF' || q.quoteType === 'MUT FUND' || q.quoteType === 'EQUITY')
        .slice(0, 8)
        .map((q: any) => ({
          symbol: q.symbol,
          name: q.shortname || q.longname || q.symbol,
          type: q.quoteType,
          exchange: q.exchange || '',
          assetType: getAssetType(q.quoteType),
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Yahoo search error:', error);
    return [];
  }
}

function getAssetType(quoteType: string): string {
  switch (quoteType) {
    case 'ETF':
    case 'MUTETF':
      return 'etf';
    case 'MUT FUND':
      return 'index_fund';
    case 'EQUITY':
      return 'stock';
    default:
      return 'etf';
  }
}

export async function fetchYahooFundData(fund: Fund): Promise<YahooFundData | null> {
  const ticker = fund.yahooTicker || getYahooTicker(fund.shortName);
  
  if (!ticker) {
    console.warn(`No Yahoo ticker found for ${fund.shortName}`);
    return null;
  }

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=topHoldings,assetProfile,fundRisk`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.quoteSummary?.result?.[0]) {
      return parseYahooResponse(data.quoteSummary.result[0], fund.name);
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching Yahoo data for ${ticker}:`, error);
    return null;
  }
}

function parseYahooResponse(data: any, fundName: string): YahooFundData {
  const topHoldings = data.topHoldings?.holdings?.slice(0, 10).map((h: any) => ({
    name: h.symbol || h.name,
    weight: h.weighting || 0,
  })) || [];

  const sectorWeightings = data.assetProfile?.sectorWeightings || {};
  const allocation = data.fundAssetAllocation || {};

  return {
    ticker: data.symbol || '',
    name: fundName,
    assetAllocation: {
      stock: allocation.stock?.weight || 0,
      bond: allocation.bond?.weight || 0,
      cash: allocation.cash?.weight || 0,
      other: allocation.other?.weight || 0,
    },
    sectorWeightings: Object.entries(sectorWeightings).reduce((acc, [key, val]: [string, any]) => {
      acc[key] = val?.weight || 0;
      return acc;
    }, {} as Record<string, number>),
    keyMetrics: {
      beta: data.fundRisk?.beta || 0,
      stdDev: data.fundRisk?.standardDeviation || 0,
      sharpeRatio: data.fundRisk?.sharpeRatio || 0,
      ter: data.feeAndExpenses?.annualReportExpenseRatio || 0,
      yield: data.distribution?.yield || 0,
    },
    topHoldings,
  };
}

export function mapYahooToFundData(yahooData: YahooFundData): Partial<Fund> {
  const stockPct = yahooData.assetAllocation.stock / 100;
  const bondPct = yahooData.assetAllocation.bond / 100;
  const cashPct = yahooData.assetAllocation.cash / 100;
  const otherPct = yahooData.assetAllocation.other / 100;

  const sectorMap: Record<string, string> = {
    'Technology': 'technology',
    'Financial Services': 'financials',
    'Healthcare': 'healthcare',
    'Consumer Discretionary': 'consumer_discretionary',
    'Consumer Staples': 'consumer_staples',
    'Industrials': 'industrials',
    'Energy': 'energy',
    'Materials': 'materials',
    'Utilities': 'utilities',
    'Real Estate': 'real_estate',
    'Communication Services': 'communication',
  };

  const sectorExposure: Record<string, number> = {};
  for (const [yahooSector, weight] of Object.entries(yahooData.sectorWeightings)) {
    const mappedSector = sectorMap[yahooSector] || yahooSector.toLowerCase().replace(/\s+/g, '_');
    sectorExposure[mappedSector] = weight * 100;
  }

  return {
    assetBreakdown: {
      equity: Math.round(stockPct * 100),
      fixedIncome: Math.round(bondPct * 100),
      gold: 0,
      realEstate: yahooData.assetAllocation.other > 0 ? Math.round(otherPct * 100) : 0,
      commodity: 0,
      cash: Math.round(cashPct * 100),
    },
    sectorExposure: sectorExposure as any,
    ter: yahooData.keyMetrics.ter * 100,
  };
}

export function calculateSRRIFromBeta(beta: number, stdDev: number): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  if (beta <= 0.4 && stdDev <= 3) return 1;
  if (beta <= 0.6 && stdDev <= 5) return 2;
  if (beta <= 0.8 && stdDev <= 8) return 3;
  if (beta <= 1.0 && stdDev <= 12) return 4;
  if (beta <= 1.2 && stdDev <= 16) return 5;
  if (beta <= 1.4 && stdDev <= 20) return 6;
  return 7;
}

export function createFundFromYahoo(searchResult: YahooSearchResult): Partial<Fund> {
  const isEquity = searchResult.assetType === 'stock' || searchResult.type === 'EQUITY';
  const isEtf = searchResult.assetType === 'etf';
  
  let equityStyle: 'growth' | 'value' | 'blend' | 'dividend' | 'small_cap' = 'blend';
  if (searchResult.symbol.includes('GROWTH') || searchResult.symbol.includes('AGG')) {
    equityStyle = 'growth';
  } else if (searchResult.symbol.includes('VALUE') || searchResult.symbol.includes('VL')) {
    equityStyle = 'value';
  } else if (searchResult.symbol.includes('DIV') || searchResult.symbol.includes('DY')) {
    equityStyle = 'dividend';
  } else if (searchResult.symbol.includes('SMALL') || searchResult.symbol.includes('SC')) {
    equityStyle = 'small_cap';
  }
  
  let srri: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 5;
  if (isEtf) {
    if (searchResult.symbol.includes('AGG') || searchResult.symbol.includes('BOND')) {
      srri = 2;
    } else if (searchResult.symbol.includes('SMALL') || searchResult.symbol.includes('EM')) {
      srri = 6;
    } else if (searchResult.symbol.includes('TECH') || searchResult.symbol.includes('GROWTH')) {
      srri = 6;
    } else {
      srri = 5;
    }
  }
  
  return {
    isin: `YAH-${searchResult.symbol}`,
    name: searchResult.name,
    shortName: searchResult.symbol,
    provider: searchResult.exchange || 'Yahoo Finance',
    fundType: searchResult.assetType as 'etf' | 'index_fund' | 'active_fund',
    vehicleNote: `ETF/Fondo de Yahoo Finance — ${searchResult.type}`,
    yahooTicker: searchResult.symbol,
    assetClass: isEquity ? 'equity' : 'fixed_income',
    assetBreakdown: isEquity 
      ? { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 }
      : { equity: 0, fixedIncome: 100, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
    geoExposure: { global: 100 },
    sectorExposure: isEquity 
      ? { technology: 20, financials: 15, healthcare: 12, consumer_discretionary: 11, industrials: 10, consumer_staples: 7, energy: 5, communication: 8, materials: 4, utilities: 3, real_estate: 2 }
      : {},
    equityStyle: isEquity ? equityStyle : undefined,
    srri,
    ter: 0.20,
    currency: 'USD',
    currencyHedged: false,
    isInflationProtected: false,
    isDiversified: true,
    minRiskProfile: 'moderate',
    maxRiskProfile: 'aggressive',
    tags: ['yahoo', searchResult.assetType, searchResult.type.toLowerCase()],
  };
}