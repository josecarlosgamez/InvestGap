import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { useAppState } from './hooks/useAppState';
import { Step1Questionnaire } from './components/steps/Step1_Questionnaire';
import { Step2Portfolio } from './components/steps/Step2_Portfolio';
import { Step3Analysis } from './components/steps/Step3_Analysis';
import { Step4GapsAndSuggestions } from './components/steps/Step4_GapsAndSuggestions';

function App() {
  const { t } = useTranslation();
  const { state, isLoadingLive, setQuestionnaire, addFundToPortfolio, removeFromPortfolio, updateWeight, analyzePortfolio, setStep, refreshLiveData } = useAppState();
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

  const progressPercent = ((state.currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-bg">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative glass-card border-x-0 border-t-0 rounded-none">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg text-text font-bold">{t('app.title')}</h1>
              <p className="text-xs text-text-secondary">{t('app.tagline')}</p>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 glass-card rounded-lg text-sm font-medium text-text hover:text-accent transition-colors"
          >
            {isES ? '🇪🇸 ES' : '🇬🇧 EN'}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-xl mx-auto px-4 py-4">
        <div className="relative h-1 bg-surface-raised rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(s => (
            <span
              key={s.num}
              className={`text-xs transition-colors ${
                state.currentStep === s.num 
                  ? 'text-accent font-medium' 
                  : state.currentStep > s.num 
                    ? 'text-accent-green' 
                    : 'text-text-muted'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-xl mx-auto pb-8 px-4">
        {state.currentStep === 1 && !state.riskProfile && (
          <Step1Questionnaire onComplete={setQuestionnaire} />
        )}

        {state.currentStep === 1 && state.riskProfile && (
          <div className="animate-fade-in">
            <div className="glass-card p-6 text-center mb-6">
              <div className="text-text-secondary mb-2">Tu perfil de inversor</div>
              <h2 className="text-3xl gradient-text font-bold mb-2">
                {t(`profiles.${state.riskProfile}`)}
              </h2>
              <p className="text-text-secondary text-sm">
                {t(`profiles.${state.riskProfile}_desc`)}
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 btn-primary"
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
              isLoadingLive={isLoadingLive}
              onRefreshLive={refreshLiveData}
            />
            {state.gaps.length > 0 && (
              <div className="p-4">
                <button
                  onClick={() => setStep(4)}
                  className="w-full py-4 btn-primary"
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