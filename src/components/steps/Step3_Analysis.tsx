import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AggregatedPortfolio, StressTestResult } from '../../types';

interface Props {
  aggregated: AggregatedPortfolio;
  stressResults: StressTestResult[];
  riskProfile: string;
}

export function Step3Analysis({ aggregated, stressResults, riskProfile }: Props) {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState<'breakdown' | 'stresstest'>('breakdown');
  const isES = i18n.language === 'es';

  const assetColors: Record<string, string> = {
    equity: '#4f8ef7',
    fixedIncome: '#36d399',
    realEstate: '#fbbf24',
    commodity: '#f472b6',
    gold: '#fbbf24',
    cash: '#8892a4',
  };

  const geoLabels: Record<string, string> = {
    us: 'EE.UU.', europe: 'Europa', japan: 'Japón', emerging_markets: 'Emergentes',
    asia_pacific_ex_japan: 'Asia Pac.', global: 'Global', spain: 'España', eurozone: 'Eurozona'
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('breakdown')}
          className={`flex-1 py-2 rounded-lg ${tab === 'breakdown' ? 'bg-accent text-white' : 'bg-surface text-text'}`}
        >
          {t('analysis.breakdown')}
        </button>
        <button
          onClick={() => setTab('stresstest')}
          className={`flex-1 py-2 rounded-lg ${tab === 'stresstest' ? 'bg-accent text-white' : 'bg-surface text-text'}`}
        >
          {t('analysis.stressTest')}
        </button>
      </div>

      {tab === 'breakdown' && (
        <>
          {/* Asset Class Breakdown */}
          <div className="bg-surface border border-border rounded-lg p-4 mb-4">
            <h3 className="text-text font-bold mb-3">{t('analysis.assetClass')}</h3>
            <div className="space-y-2">
              {Object.entries(aggregated.assetBreakdown).map(([key, val]) => (
                val > 0 && (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: assetColors[key] }} />
                    <span className="text-text text-sm w-24 capitalize">{key}</span>
                    <div className="flex-1 h-4 bg-surface-raised rounded overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${val}%` }} />
                    </div>
                    <span className="text-text-mono text-sm w-12 text-right">{val.toFixed(0)}%</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Geography */}
          <div className="bg-surface border border-border rounded-lg p-4 mb-4">
            <h3 className="text-text font-bold mb-3">{t('analysis.geography')}</h3>
            <div className="space-y-2">
              {Object.entries(aggregated.geoExposure)
                .filter(([, v]) => v > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-text text-sm w-20">{geoLabels[key] || key}</span>
                    <div className="flex-1 h-4 bg-surface-raised rounded overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${val}%` }} />
                    </div>
                    <span className="text-text-mono text-sm w-10 text-right">{val.toFixed(0)}%</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="text-text font-bold mb-3">{t('analysis.metrics')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-text-muted text-sm">{t('analysis.srri')}</span>
                <div className="text-2xl text-accent font-mono">{aggregated.weightedSRRI}/7</div>
              </div>
              <div>
                <span className="text-text-muted text-sm">{t('analysis.ter')}</span>
                <div className="text-2xl text-accent font-mono">{aggregated.weightedTER}%</div>
              </div>
              <div>
                <span className="text-text-muted text-sm">{t('analysis.infProt')}</span>
                <div className="text-text">{aggregated.hasInflationProtection ? '✓' : '✗'}</div>
              </div>
              <div>
                <span className="text-text-muted text-sm">{t('analysis.currHedg')}</span>
                <div className="text-text">{aggregated.hasCurrencyHedging ? '✓' : '✗'}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'stresstest' && (
        <>
          <p className="text-text-muted text-sm mb-4">{t('analysis.disclaimer')}</p>
          {stressResults.map(result => (
            <div key={result.crisis.key} className="bg-surface border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-text font-bold">{isES ? result.crisis.nameES : result.crisis.nameEN}</h3>
                <span className="text-text-muted text-sm">{result.crisis.period}</span>
              </div>
              <p className="text-text-muted text-sm mb-3">{isES ? result.crisis.descriptionES : result.crisis.descriptionEN}</p>
              <div className={`text-4xl font-mono mb-3 ${result.portfolioDrawdown < 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                {result.portfolioDrawdown > 0 ? '+' : ''}{result.portfolioDrawdown}%
              </div>
              <div className="space-y-1">
                {result.breakdown.slice(0, 5).map(item => (
                  <div key={item.positionName} className="flex text-sm">
                    <span className="text-text w-16 font-mono">{item.positionName}</span>
                    <span className="text-text-muted w-12 text-right">{item.weight}%</span>
                    <span className={`flex-1 text-right font-mono ${item.estimatedDrawdown < 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                      {item.estimatedDrawdown > 0 ? '+' : ''}{item.estimatedDrawdown}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}