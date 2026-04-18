import { useState, useCallback } from 'react';
import type { Fund, PortfolioPosition } from '../types';
import { YAHOO_TICKER_MAP, fetchYahooFundData, mapYahooToFundData, type YahooFundData } from '../data/yahooFinance';

interface EnrichedFundData {
  originalFund: Fund;
  yahooData: YahooFundData | null;
  enrichedFund: Partial<Fund> | null;
  loading: boolean;
  error: string | null;
}

export function useYahooFinance() {
  const [enrichedData, setEnrichedData] = useState<Map<string, EnrichedFundData>>(new Map());
  const [globalLoading, setGlobalLoading] = useState(false);

  const getTicker = useCallback((fund: Fund): string | null => {
    if (fund.yahooTicker) return fund.yahooTicker;
    return YAHOO_TICKER_MAP[fund.shortName.toUpperCase()] || null;
  }, []);

  const fetchFundData = useCallback(async (fund: Fund): Promise<EnrichedFundData> => {
    const ticker = getTicker(fund);
    
    if (!ticker) {
      return {
        originalFund: fund,
        yahooData: null,
        enrichedFund: null,
        loading: false,
        error: `No Yahoo ticker found for ${fund.shortName}`,
      };
    }

    try {
      const yahooData = await fetchYahooFundData({ ...fund, yahooTicker: ticker });
      
      if (!yahooData) {
        return {
          originalFund: fund,
          yahooData: null,
          enrichedFund: null,
          loading: false,
          error: `No data available for ${fund.shortName}`,
        };
      }

      const enrichedFund = mapYahooToFundData(yahooData);
      
      return {
        originalFund: fund,
        yahooData,
        enrichedFund,
        loading: false,
        error: null,
      };
    } catch (err) {
      return {
        originalFund: fund,
        yahooData: null,
        enrichedFund: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }, [getTicker]);

  const fetchPortfolioData = useCallback(async (portfolio: PortfolioPosition[]): Promise<void> => {
    setGlobalLoading(true);
    const newData = new Map<string, EnrichedFundData>();

    for (const pos of portfolio) {
      const key = pos.fund.isin;
      const result = await fetchFundData(pos.fund);
      newData.set(key, result);
      
      setEnrichedData(new Map(newData));
    }

    setGlobalLoading(false);
  }, [fetchFundData]);

  const getEnrichedFund = useCallback((fund: Fund): Partial<Fund> | null => {
    const data = enrichedData.get(fund.isin);
    return data?.enrichedFund || null;
  }, [enrichedData]);

  const getFundMetrics = useCallback((fund: Fund): YahooFundData | null => {
    const data = enrichedData.get(fund.isin);
    return data?.yahooData || null;
  }, [enrichedData]);

  return {
    enrichedData,
    globalLoading,
    fetchFundData,
    fetchPortfolioData,
    getEnrichedFund,
    getFundMetrics,
  };
}