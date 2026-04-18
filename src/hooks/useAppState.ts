import { useState, useCallback } from 'react';
import type { AppState, QuestionnaireAnswers } from '../types';
import { calculateRiskProfile } from '../engine/questionnaire';
import { aggregatePortfolio } from '../engine/portfolio';
import { runStressTest } from '../engine/stressTest';
import { detectGaps } from '../engine/gapDetector';
import { generateSuggestions } from '../engine/suggestions';
import { FUND_DATABASE } from '../data/funds';

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

  return {
    state,
    setQuestionnaire,
    addFundToPortfolio,
    removeFromPortfolio,
    updateWeight,
    analyzePortfolio,
    setStep,
  };
}