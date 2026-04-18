import type { QuestionnaireAnswers, RiskProfile } from '../types';

export function calculateRiskProfile(answers: QuestionnaireAnswers): RiskProfile {
  let score = 0;

  score += { 1: 0, 2: 2, 3: 5, 4: 8, 5: 10 }[answers.timeHorizon];
  score += (answers.reactionToLoss - 1) * 2.5;
  score += { emergency: 0, house: 1, retirement: 3, wealth: 4 }[answers.primaryGoal];
  if (answers.needsWithdrawals) score -= 3;
  score += { under30: 6, '30to45': 5, '45to55': 3, '55to65': 1, over65: 0 }[answers.ageRange];
  score += { beginner: 0, intermediate: 1, advanced: 3 }[answers.knowledgeLevel];

  score = Math.max(0, Math.min(33, score));

  if (score <= 6) return 'conservative';
  if (score <= 12) return 'moderate_conservative';
  if (score <= 19) return 'moderate';
  if (score <= 26) return 'moderate_aggressive';
  return 'aggressive';
}