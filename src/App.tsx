import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { useAppState } from './hooks/useAppState';
import { Step1Questionnaire } from './components/steps/Step1_Questionnaire';
import { Step2Portfolio } from './components/steps/Step2_Portfolio';
import { Step3Analysis } from './components/steps/Step3_Analysis';
import { Step4GapsAndSuggestions } from './components/steps/Step4_GapsAndSuggestions';

function App() {
  const { t } = useTranslation();
  const { state, setQuestionnaire, addFundToPortfolio, removeFromPortfolio, updateWeight, analyzePortfolio, setStep } = useAppState();
  const isES = i18n.language === 'es';

  const toggleLanguage = () => {
    const newLang = isES ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('fondoscope-lang', newLang);
  };

  const steps = [
    { num: 1, key: 'questionnaire', label: t('steps.questionnaire') },
    { num: 2, key: 'portfolio', label: t('steps.portfolio') },
    { num: 3, key: 'analysis', label: t('steps.analysis') },
    { num: 4, key: 'suggestions', label: t('steps.suggestions') },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border p-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl text-text font-bold">{t('app.title')}</h1>
            <p className="text-text-muted text-sm">{t('app.tagline')}</p>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 border border-border rounded text-text text-sm"
          >
            {isES ? '🇪🇸 ES' : '🇬🇧 EN'}
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-xl mx-auto p-4">
        <div className="flex gap-1">
          {steps.map(s => (
            <div
              key={s.num}
              className={`flex-1 h-1 rounded ${state.currentStep >= s.num ? 'bg-accent' : 'bg-surface-raised'}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(s => (
            <span
              key={s.num}
              className={`text-xs ${state.currentStep === s.num ? 'text-accent' : 'text-text-muted'}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-xl mx-auto pb-8">
        {state.currentStep === 1 && !state.riskProfile && (
          <Step1Questionnaire onComplete={setQuestionnaire} />
        )}

        {state.currentStep === 1 && state.riskProfile && (
          <div className="p-4">
            <div className="bg-surface border border-border rounded-lg p-6 text-center mb-6">
              <p className="text-text-muted mb-2">Tu perfil de inversionista:</p>
              <h2 className="text-3xl text-accent font-bold mb-2">
                {t(`profiles.${state.riskProfile}`)}
              </h2>
              <p className="text-text-muted text-sm">
                {t(`profiles.${state.riskProfile}_desc`)}
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-accent text-white rounded-lg"
            >
              {t('common.next')}
            </button>
          </div>
        )}

        {state.currentStep === 2 && (
          <Step2Portfolio
            portfolio={state.portfolio}
            onAddFund={addFundToPortfolio}
            onRemoveFund={removeFromPortfolio}
            onUpdateWeight={updateWeight}
            onAnalyze={analyzePortfolio}
          />
        )}

        {state.currentStep === 3 && state.aggregated && state.stressResults && (
          <>
            <Step3Analysis
              aggregated={state.aggregated}
              stressResults={state.stressResults}
              riskProfile={state.riskProfile || ''}
            />
            {state.gaps.length > 0 && (
              <div className="p-4">
                <button
                  onClick={() => setStep(4)}
                  className="w-full py-3 bg-accent text-white rounded-lg"
                >
                  {t('common.next')}
                </button>
              </div>
            )}
          </>
        )}

        {state.currentStep === 4 && (
          <Step4GapsAndSuggestions gaps={state.gaps} suggestions={state.suggestions} />
        )}
      </main>
    </div>
  );
}

export default App;