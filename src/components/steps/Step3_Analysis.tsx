import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AggregatedPortfolio, StressTestResult } from '../../types';
import { DonutChart } from '../charts/DonutChart';
import { BarChart, HorizontalBar } from '../charts/BarChart';

interface Props {
  aggregated: AggregatedPortfolio;
  stressResults: StressTestResult[];
  riskProfile: string;
  isLoadingLive?: boolean;
  onRefreshLive?: () => void;
}

export function Step3Analysis({ aggregated, stressResults, riskProfile, isLoadingLive = false, onRefreshLive }: Props) {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState<'breakdown' | 'stresstest'>('breakdown');
  const isES = i18n.language === 'es';

  const assetColors: Record<string, string> = {
    equity: '#0052FF',
    fixedIncome: '#00D68F',
    realEstate: '#F79E1B',
    commodity: '#EB001B',
    gold: '#F79E1B',
    cash: '#6B7280',
  };

  const assetData = Object.entries(aggregated.assetBreakdown)
    .filter(([, val]) => val > 0)
    .map(([key, val]) => ({
      label: key === 'fixedIncome' ? 'Bonos' : key.charAt(0).toUpperCase() + key.slice(1),
      value: val,
      color: assetColors[key] || '#6B7280',
    }));

  const geoLabels: Record<string, string> = {
    us: 'EE.UU.', europe: 'Europa', japan: 'Japón', emerging_markets: 'Emergentes',
    asia_pacific_ex_japan: 'Asia Pac.', global: 'Global', spain: 'España', eurozone: 'Eurozona'
  };

  const geoData = Object.entries(aggregated.geoExposure)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([key, val]) => ({
      label: geoLabels[key] || key,
      value: val,
    }));

  const crisisData = stressResults
    .filter(r => r.portfolioDrawdown !== 0)
    .slice(0, 5)
    .map(r => ({
      label: isES ? r.crisis.nameES : r.crisis.nameEN,
      value: r.portfolioDrawdown,
    }));

  const sortedByDrawdown = [...stressResults].sort((a, b) => a.portfolioDrawdown - b.portfolioDrawdown);
  const worstCrisis = sortedByDrawdown[0];
  const bestCrisis = sortedByDrawdown[sortedByDrawdown.length - 1];

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Header Stats */}
      <div className="flex gap-3 mb-6">
        <div className="glass-card flex-1 p-4 text-center">
          <div className="text-text-secondary text-xs mb-1">Peor Crisis</div>
          <div className="text-xl font-bold text-accent-red font-mono">
            {worstCrisis?.portfolioDrawdown !== undefined ? `${worstCrisis.portfolioDrawdown}%` : '—'}
          </div>
          <div className="text-xs text-text-muted truncate">
            {isES ? worstCrisis?.crisis.nameES : worstCrisis?.crisis.nameEN}
          </div>
        </div>
        <div className="glass-card flex-1 p-4 text-center">
          <div className="text-text-secondary text-xs mb-1">Mejor Crisis</div>
          <div className="text-xl font-bold text-accent-green font-mono">
            {bestCrisis?.portfolioDrawdown !== undefined ? `${bestCrisis.portfolioDrawdown >= 0 ? '+' : ''}${bestCrisis.portfolioDrawdown}%` : '—'}
          </div>
          <div className="text-xs text-text-muted truncate">
            {isES ? bestCrisis?.crisis.nameES : bestCrisis?.crisis.nameEN}
          </div>
        </div>
        <div className="glass-card flex-1 p-4 text-center">
          <div className="text-text-secondary text-xs mb-1">SRRI</div>
          <div className="text-xl font-bold gradient-text font-mono">
            {aggregated.weightedSRRI}<span className="text-sm text-text-muted">/7</span>
          </div>
          <div className="text-xs text-text-muted">Riesgo</div>
        </div>
      </div>

      {/* Live Data Refresh Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-text-secondary text-sm">
          {isLoadingLive ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Actualizando...
            </span>
          ) : (
            'Datos calculated'
          )}
        </div>
        <button
          onClick={onRefreshLive}
          disabled={isLoadingLive}
          className="flex items-center gap-2 px-3 py-1.5 text-sm glass-card hover:text-accent transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('breakdown')}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            tab === 'breakdown' 
              ? 'bg-gradient-to-r from-accent to-accent-secondary text-white shadow-glow-blue' 
              : 'glass-card text-text-secondary hover:text-text'
          }`}
        >
          {t('analysis.breakdown')}
        </button>
        <button
          onClick={() => setTab('stresstest')}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            tab === 'stresstest' 
              ? 'bg-gradient-to-r from-accent to-accent-secondary text-white shadow-glow-blue' 
              : 'glass-card text-text-secondary hover:text-text'
          }`}
        >
          {t('analysis.stressTest')}
        </button>
      </div>

      {tab === 'breakdown' && (
        <>
          {/* Asset Allocation - Donut Chart */}
          <div className="glass-card p-6 mb-4">
            <h3 className="text-text font-semibold mb-4">{t('analysis.assetClass')}</h3>
            <DonutChart data={assetData} size={180} strokeWidth={28} />
          </div>

          {/* Geographic Allocation */}
          <div className="glass-card p-6 mb-4">
            <h3 className="text-text font-semibold mb-4">{t('analysis.geography')}</h3>
            <BarChart data={geoData} maxValue={100} />
          </div>

          {/* Key Metrics */}
          <div className="glass-card p-6">
            <h3 className="text-text font-semibold mb-4">{t('analysis.metrics')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <HorizontalBar label={t('analysis.infProt')} value={aggregated.hasInflationProtection ? 100 : 0} color="#00D68F" />
              <HorizontalBar label={t('analysis.currHedg')} value={aggregated.hasCurrencyHedging ? 100 : 0} color="#00D68F" />
              <div className="col-span-2 pt-2 border-t border-white/10">
                <div className="text-text-secondary text-sm mb-1">{t('analysis.ter')}</div>
                <div className="text-2xl gradient-text font-mono">
                  {aggregated.weightedTER > 0 ? `${aggregated.weightedTER}%` : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'stresstest' && (
        <>
          <p className="text-text-secondary text-sm mb-4 opacity-70">{t('analysis.disclaimer')}</p>
          
          {/* Crisis Comparison Bar Chart */}
          <div className="glass-card p-6 mb-4">
            <h3 className="text-text font-semibold mb-4">Comparación de Crisis</h3>
            <BarChart data={crisisData} maxValue={60} />
          </div>

          {/* Detailed Crisis Cards */}
          {stressResults.map(result => (
            <div key={result.crisis.key} className="glass-card p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-text font-semibold">
                  {isES ? result.crisis.nameES : result.crisis.nameEN}
                </h3>
                <span className="text-text-muted text-xs">{result.crisis.period}</span>
              </div>
              <p className="text-text-secondary text-sm mb-3 opacity-70">
                {isES ? result.crisis.descriptionES : result.crisis.descriptionEN}
              </p>
              
              <div className="flex items-center gap-4 mb-3">
                <div className={`text-3xl font-bold font-mono ${
                  result.portfolioDrawdown < 0 ? 'text-accent-red' : 'text-accent-green'
                }`}>
                  {result.portfolioDrawdown >= 0 ? '+' : ''}{result.portfolioDrawdown}%
                </div>
                <div className="flex-1 h-2 bg-surface-raised rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      result.portfolioDrawdown < 0 ? 'bg-accent-red' : 'bg-accent-green'
                    }`}
                    style={{ 
                      width: `${Math.min(Math.abs(result.portfolioDrawdown), 100)}%`,
                      marginLeft: result.portfolioDrawdown < 0 ? 'auto' : 0,
                      marginRight: result.portfolioDrawdown < 0 ? 0 : 'auto',
                      right: result.portfolioDrawdown < 0 ? 0 : 'auto',
                      left: result.portfolioDrawdown >= 0 ? 0 : 'auto',
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-1 pt-2 border-t border-white/10">
                {result.breakdown.slice(0, 4).map(item => (
                  <div key={item.positionName} className="flex items-center text-sm">
                    <span className="text-secondary w-20 truncate">{item.positionName}</span>
                    <span className="text-text-muted w-10 text-right">{item.weight}%</span>
                    <span className={`flex-1 text-right font-mono ${
                      item.estimatedDrawdown < 0 ? 'text-accent-red' : 'text-accent-green'
                    }`}>
                      {item.estimatedDrawdown >= 0 ? '+' : ''}{item.estimatedDrawdown}%
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