import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { QuestionnaireAnswers } from '../../types';

interface Props {
  onComplete: (answers: QuestionnaireAnswers) => void;
}

export function Step1Questionnaire({ onComplete }: Props) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState(1);
  const [answers, setAnswers] = useState<Partial<QuestionnaireAnswers>>({});

  const updateAnswer = <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => {
    setAnswers(a => ({ ...a, [key]: value }));
  };

  const canProceed = () => {
    if (question === 1) return answers.timeHorizon !== undefined;
    if (question === 2) return answers.reactionToLoss !== undefined;
    if (question === 3) return answers.primaryGoal !== undefined;
    if (question === 4) return answers.needsWithdrawals !== undefined;
    if (question === 5) return answers.ageRange !== undefined;
    if (question === 6) return answers.knowledgeLevel !== undefined;
    return false;
  };

  const handleNext = () => {
    if (question < 6) {
      setQuestion(question + 1);
    } else {
      onComplete(answers as QuestionnaireAnswers);
    }
  };

  const handleBack = () => {
    if (question > 1) setQuestion(question - 1);
  };

  const progress = (question / 6) * 100;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-6">
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-text-muted text-sm mt-2">{question}/6</p>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        {question === 1 && (
          <>
            <h2 className="text-xl text-text mb-4">{t('questionnaire.q1')}</h2>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => updateAnswer('timeHorizon', n as QuestionnaireAnswers['timeHorizon'])}
                className={`w-full text-left p-3 mb-2 rounded border ${
                  answers.timeHorizon === n ? 'border-accent bg-surface-raised' : 'border-border text-text'
                }`}
              >
                {t(`questionnaire.q1a${n}`)}
              </button>
            ))}
          </>
        )}

        {question === 2 && (
          <>
            <h2 className="text-xl text-text mb-4">{t('questionnaire.q2')}</h2>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => updateAnswer('reactionToLoss', n as QuestionnaireAnswers['reactionToLoss'])}
                className={`w-full text-left p-3 mb-2 rounded border ${
                  answers.reactionToLoss === n ? 'border-accent bg-surface-raised' : 'border-border text-text'
                }`}
              >
                {t(`questionnaire.q2a${n}`)}
              </button>
            ))}
          </>
        )}

        {question === 3 && (
          <>
            <h2 className="text-xl text-text mb-4">{t('questionnaire.q3')}</h2>
            {['emergency', 'house', 'retirement', 'wealth'].map(g => (
              <button
                key={g}
                onClick={() => updateAnswer('primaryGoal', g as QuestionnaireAnswers['primaryGoal'])}
                className={`w-full text-left p-3 mb-2 rounded border ${
                  answers.primaryGoal === g ? 'border-accent bg-surface-raised' : 'border-border text-text'
                }`}
              >
                {t(`questionnaire.q3a${['emergency', 'house', 'retirement', 'wealth'].indexOf(g) + 1}`)}
              </button>
            ))}
          </>
        )}

        {question === 4 && (
          <>
            <h2 className="text-xl text-text mb-4">{t('questionnaire.q4')}</h2>
            <button
              onClick={() => updateAnswer('needsWithdrawals', true)}
              className={`w-full text-left p-3 mb-2 rounded border ${answers.needsWithdrawals === true ? 'border-accent bg-surface-raised' : 'border-border text-text'}`}
            >
              {t('questionnaire.q4a1')}
            </button>
            <button
              onClick={() => updateAnswer('needsWithdrawals', false)}
              className={`w-full text-left p-3 mb-2 rounded border ${answers.needsWithdrawals === false ? 'border-accent bg-surface-raised' : 'border-border text-text'}`}
            >
              {t('questionnaire.q4a2')}
            </button>
          </>
        )}

        {question === 5 && (
          <>
            <h2 className="text-xl text-text mb-4">{t('questionnaire.q5')}</h2>
            {['under30', '30to45', '45to55', '55to65', 'over65'].map((a, i) => (
              <button
                key={a}
                onClick={() => updateAnswer('ageRange', a as QuestionnaireAnswers['ageRange'])}
                className={`w-full text-left p-3 mb-2 rounded border ${
                  answers.ageRange === a ? 'border-accent bg-surface-raised' : 'border-border text-text'
                }`}
              >
                {t(`questionnaire.q5a${i + 1}`)}
              </button>
            ))}
          </>
        )}

        {question === 6 && (
          <>
            <h2 className="text-xl text-text mb-4">{t('questionnaire.q6')}</h2>
            {['beginner', 'intermediate', 'advanced'].map((k, i) => (
              <button
                key={k}
                onClick={() => updateAnswer('knowledgeLevel', k as QuestionnaireAnswers['knowledgeLevel'])}
                className={`w-full text-left p-3 mb-2 rounded border ${
                  answers.knowledgeLevel === k ? 'border-accent bg-surface-raised' : 'border-border text-text'
                }`}
              >
                {t(`questionnaire.q6a${i + 1}`)}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          disabled={question === 1}
          className="px-4 py-2 text-text disabled:opacity-50"
        >
          {t('questionnaire.back')}
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-6 py-2 bg-accent text-white rounded disabled:opacity-50"
        >
          {question === 6 ? t('questionnaire.submit') : t('questionnaire.next')}
        </button>
      </div>
    </div>
  );
}