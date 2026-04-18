import { useTranslation } from 'react-i18next';
import type { Gap, FundSuggestion } from '../../types';

interface Props {
  gaps: Gap[];
  suggestions: FundSuggestion[];
}

export function Step4GapsAndSuggestions({ gaps, suggestions }: Props) {
  const { t, i18n } = useTranslation();
  const isES = i18n.language === 'es';

  const severityColors: Record<string, string> = {
    critical: 'bg-accent-red text-white',
    moderate: 'bg-accent-yellow text-bg',
    minor: 'border border-accent text-accent',
  };

  const severityLabels: Record<string, string> = {
    critical: t('gaps.critical'),
    moderate: t('gaps.moderate'),
    minor: t('gaps.minor'),
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl text-text font-bold mb-4">{t('gaps.title')}</h1>

      {/* Gaps */}
      <div className="space-y-3 mb-6">
        {gaps.map((gap, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs ${severityColors[gap.severity]}`}>
                {severityLabels[gap.severity]}
              </span>
              <h3 className="text-text font-bold">{isES ? gap.titleES : gap.titleEN}</h3>
            </div>
            <p className="text-text-muted text-sm mb-2">{isES ? gap.explanationES : gap.explanationEN}</p>
            {gap.metric && <p className="text-accent font-mono text-sm">{gap.metric}</p>}
          </div>
        ))}
        {gaps.length === 0 && (
          <p className="text-accent-green text-center py-4">✓ No gaps detected</p>
        )}
      </div>

      <h1 className="text-2xl text-text font-bold mb-4">{t('suggestions.title')}</h1>
      <p className="text-text-muted text-sm mb-4">{t('suggestions.disclaimer')}</p>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions.map((sug, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-text font-bold">{sug.fund.name}</h3>
                <p className="text-text-muted text-xs font-mono">{sug.fund.isin}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  sug.fund.srri <= 2 ? 'bg-accent-green text-bg' :
                  sug.fund.srri <= 4 ? 'bg-accent-yellow text-bg' :
                  sug.fund.srri <= 6 ? 'bg-orange-500 text-white' : 'bg-accent-red text-white'
                }`}>
                  SRRI {sug.fund.srri}
                </span>
                <p className="text-text-muted text-xs mt-1">TER: {sug.fund.ter}%</p>
              </div>
            </div>
            <p className="text-text-muted text-sm mb-2">{isES ? sug.reasonES : sug.reasonEN}</p>
            <div className="flex items-center justify-between">
              <span className="text-text text-sm">
                {t('suggestions.addresses')}: {sug.addressesGaps[0]}
              </span>
              <span className="text-accent font-mono">+{sug.suggestedWeight}%</span>
            </div>
            <a
              href={`https://www.morningstar.com/search#q=${sug.fund.isin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm underline"
            >
              {t('suggestions.moreInfo')}
            </a>
          </div>
        ))}
        {suggestions.length === 0 && (
          <p className="text-text-muted text-center py-4">No suggestions available</p>
        )}
      </div>
    </div>
  );
}