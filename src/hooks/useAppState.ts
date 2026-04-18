import { useState, useCallback } from 'react';
import type { AppState, QuestionnaireAnswers, Fund, PortfolioPosition } from '../types';
import { calculateRiskProfile } from '../engine/questionnaire';
import { aggregatePortfolio } from '../engine/portfolio';
import { runStressTest, calculateFundDrawdown } from '../engine/stressTest';
import { detectGaps } from '../engine/gapDetector';
import { generateSuggestions } from '../engine/suggestions';
import { FUND_DATABASE } from '../data/funds';
import { fetchYahooFundData, mapYahooToFundData } from '../data/yahooFinance';
import type { CrisisKey } from '../types';

interface EnrichedData {
  yahooData: any;
  liveDrawdowns: Record<string, number>;
}

export function useAppState() {
  const [state, setState] = useState<AppState>({
    currentStep: 1,
    questionnaire: null,
    riskProfile: null,
    portfolio: [],
    aggregated: null,
    stressResults: [],
    gaps: [],
    suggestions: [],
  });
  
  const [enrichedData, setEnrichedData] = useState<Map<string, EnrichedData>>(new Map());
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const setQuestionnaire = useCallback((answers: QuestionnaireAnswers) => {
    const riskProfile = calculateRiskProfile(answers);
    setState(s => ({ ...s, questionnaire: answers, riskProfile, currentStep: 2 }));
  }, []);

  const addFundToPortfolio = useCallback((fund: typeof FUND_DATABASE[number], weight: number) => {
    setState(s => {
      if (s.portfolio.some(p => p.fund.isin === fund.isin)) return s;
      const newPortfolio = [...s.portfolio, { fund, weight }];
      return { ...s, portfolio: newPortfolio };
    });
  }, []);

  const removeFromPortfolio = useCallback((isin: string) => {
    setState(s => ({ ...s, portfolio: s.portfolio.filter(p => p.fund.isin !== isin) }));
  }, []);

  const updateWeight = useCallback((isin: string, weight: number) => {
    setState(s => ({
      ...s,
      portfolio: s.portfolio.map(p => p.fund.isin === isin ? { ...p, weight } : p)
    }));
  }, []);

  const analyzePortfolio = useCallback(() => {
    setState(s => {
      if (!s.riskProfile) return s;
      const aggregated = aggregatePortfolio(s.portfolio);
      const stressResults = runStressTest(s.portfolio);
      const gaps = detectGaps(aggregated, s.riskProfile);
      const suggestions = generateSuggestions(gaps, s.portfolio, s.riskProfile, FUND_DATABASE);
      return { ...s, aggregated, stressResults, gaps, suggestions, currentStep: 3 };
    });
  }, []);

  const setStep = useCallback((step: 1 | 2 | 3 | 4) => {
    setState(s => ({ ...s, currentStep: step }));
  }, []);

  const refreshLiveData = useCallback(async () => {
    setIsLoadingLive(true);
    const newEnriched = new Map<string, EnrichedData>();
    
    for (const pos of state.portfolio) {
      const fund = pos.fund;
      let yahooData = null;
      let liveDrawdowns: Record<string, number> = {};
      
      try {
        if (fund.yahooTicker) {
          yahooData = await fetchYahooFundData({ ...fund, yahooTicker: fund.yahooTicker });
        }
        
        if (yahooData?.keyMetrics) {
          const crisisKeys: CrisisKey[] = [
            'great_depression_1929', 'oil_shock_stagflation_1973', 'black_monday_1987',
            'asian_crisis_ltcm_1997', 'dotcom_2000_2002', 'gfc_2008_2009',
            'eu_debt_2011_2012', 'china_commodities_2015', 'covid_2020', 'rate_hike_2022'
          ];
          
          const beta = yahooData.keyMetrics.beta || 1;
          const stdDev = yahooData.keyMetrics.stdDev || 15;
          
          for (const crisis of crisisKeys) {
            const baseDrawdown = calculateFundDrawdown(fund, crisis);
            const betaAdjusted = baseDrawdown * beta;
            const stressAdjusted = crisis.includes('2008') || crisis.includes('1929') || crisis.includes('gfc')
              ? betaAdjusted * 1.2
              : betaAdjusted;
            liveDrawdowns[crisis] = Math.round(stressAdjusted * 10) / 10;
          }
        }
      } catch (e) {
        console.error(`Error fetching live data for ${fund.shortName}:`, e);
      }
      
      newEnriched.set(fund.isin, { yahooData, liveDrawdowns });
    }
    
    setEnrichedData(newEnriched);
    
    if (newEnriched.size > 0) {
      setState(s => {
        const stressResults = s.stressResults.map(result => {
          const newBreakdown = result.breakdown.map(pos => {
            const enriched = newEnriched.get(pos.positionName);
            if (enriched?.liveDrawdowns[result.crisis.key]) {
              return {
                ...pos,
                estimatedDrawdown: enriched.liveDrawdowns[result.crisis.key],
              };
            }
            return pos;
          });
          
          const portfolioDrawdown = newBreakdown.reduce((sum, p) => sum + (p.weight / 100) * p.estimatedDrawdown, 0);
          
          return {
            ...result,
            breakdown: newBreakdown,
            portfolioDrawdown: Math.round(portfolioDrawdown * 10) / 10,
          };
        });
        
        return { ...s, stressResults };
      });
    }
    
    setIsLoadingLive(false);
  }, [state.portfolio, state.stressResults]);

  return {
    state,
    enrichedData,
    isLoadingLive,
    setQuestionnaire,
    addFundToPortfolio,
    removeFromPortfolio,
    updateWeight,
    analyzePortfolio,
    setStep,
    refreshLiveData,
  };
}