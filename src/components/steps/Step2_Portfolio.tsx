import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Fund, PortfolioPosition } from '../../types';
import { FUND_DATABASE } from '../../data/funds';
import { searchYahooFunds, createFundFromYahoo, fetchYahooFundData, mapYahooToFundData, type YahooSearchResult } from '../../data/yahooFinance';

interface Props {
  portfolio: PortfolioPosition[];
  onAddFund: (fund: Fund, weight: number) => void;
  onRemoveFund: (isin: string) => void;
  onUpdateWeight: (isin: string, weight: number) => void;
  onAnalyze: () => void;
}

export function Step2Portfolio({ portfolio, onAddFund, onRemoveFund, onUpdateWeight, onAnalyze }: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [weight, setWeight] = useState(10);
  const [yahooSearchResults, setYahooSearchResults] = useState<YahooSearchResult[]>([]);
  const [isSearchingYahoo, setIsSearchingYahoo] = useState(false);
  const [searchSource, setSearchSource] = useState<'local' | 'yahoo'>('local');

  const totalWeight = useMemo(() => portfolio.reduce((sum, p) => sum + p.weight, 0), [portfolio]);

  const localFunds = useMemo(() => {
    if (search.length < 2) return [];
    const searchLower = search.toLowerCase();
    return FUND_DATABASE.filter(f => 
      f.name.toLowerCase().includes(searchLower) ||
      f.shortName.toLowerCase().includes(searchLower) ||
      f.provider.toLowerCase().includes(searchLower) ||
      f.isin.toLowerCase().includes(searchLower)
    ).slice(0, 6);
  }, [search]);

  useEffect(() => {
    const searchYahoo = async () => {
      if (search.length < 2) {
        setYahooSearchResults([]);
        return;
      }

      setIsSearchingYahoo(true);
      const results = await searchYahooFunds(search);
      setYahooSearchResults(results);
      setIsSearchingYahoo(false);
    };

    const debounce = setTimeout(searchYahoo, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  const handleSelectLocalFund = (fund: Fund) => {
    setSelectedFund(fund);
    setSearch('');
    setShowResults(false);
    setWeight(10);
  };

  const handleSelectYahooFund = async (result: YahooSearchResult) => {
    const partialFund = createFundFromYahoo(result);
    const fullFund: Fund = {
      isin: partialFund.isin || `YAH-${result.symbol}`,
      name: partialFund.name || result.symbol,
      shortName: partialFund.shortName || result.symbol,
      provider: partialFund.provider || 'Yahoo Finance',
      fundType: partialFund.fundType || 'etf',
      vehicleNote: partialFund.vehicleNote || '',
      assetClass: partialFund.assetClass || 'equity',
      assetBreakdown: partialFund.assetBreakdown || { equity: 100, fixedIncome: 0, realEstate: 0, commodity: 0, gold: 0, cash: 0 },
      geoExposure: partialFund.geoExposure || { global: 100 },
      sectorExposure: partialFund.sectorExposure || {},
      equityStyle: partialFund.equityStyle,
      srri: partialFund.srri || 5,
      ter: partialFund.ter || 0.20,
      currency: partialFund.currency || 'USD',
      currencyHedged: partialFund.currencyHedged || false,
      isInflationProtected: partialFund.isInflationProtected || false,
      isDiversified: partialFund.isDiversified || true,
      minRiskProfile: partialFund.minRiskProfile || 'moderate',
      maxRiskProfile: partialFund.maxRiskProfile || 'aggressive',
      tags: partialFund.tags || [],
      yahooTicker: result.symbol,
    };

    const yahooData = await fetchYahooFundData(fullFund);
    if (yahooData) {
      const enriched = mapYahooToFundData(yahooData);
      fullFund.assetBreakdown = enriched.assetBreakdown || fullFund.assetBreakdown;
      fullFund.sectorExposure = enriched.sectorExposure || fullFund.sectorExposure;
      fullFund.ter = enriched.ter || fullFund.ter;
    }

    setSelectedFund(fullFund);
    setSearch('');
    setShowResults(false);
    setWeight(10);
  };

  const handleAdd = () => {
    if (selectedFund) {
      onAddFund(selectedFund, weight);
      setSelectedFund(null);
    }
  };

  const isComplete = totalWeight === 100;
  const remaining = 100 - totalWeight;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl text-text font-bold mb-2">{t('portfolio.title')}</h1>
      <p className="text-text-secondary text-sm mb-4">
        {t('portfolio.total')}: {totalWeight.toFixed(0)}% | {t('portfolio.remaining')}: {remaining}%
      </p>

      {/* Search Input */}
      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setShowResults(true); setSearchSource('yahoo'); }}
            placeholder="Buscar fondo o ETF (ej: S&P 500, MSCI World, NASDAQ...)"
            className="w-full p-4 bg-surface-raised border border-border-light rounded-xl text-text placeholder-text-muted focus:border-accent focus:outline-none"
            onFocus={() => setShowResults(true)}
          />
          {isSearchingYahoo && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
        </div>

        {showResults && search.length >= 2 && (
          <div className="absolute z-20 w-full mt-2 bg-surface border border-border-light rounded-xl max-h-80 overflow-auto shadow-glass">
            {/* Local Database Results */}
            {localFunds.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-text-muted px-2 py-1">Base de datos local</div>
                {localFunds.map(fund => (
                  <button
                    key={fund.isin}
                    onClick={() => { handleSelectLocalFund(fund); setSearchSource('local'); }}
                    className="w-full text-left px-3 py-2 hover:bg-surface-raised rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-mono text-sm">{fund.shortName}</span>
                      <span className="text-xs text-text-muted bg-surface px-2 py-0.5 rounded">{fund.provider}</span>
                    </div>
                    <div className="text-text-secondary text-xs truncate">{fund.name}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Yahoo Search Results */}
            {yahooSearchResults.length > 0 && (
              <div className="p-2 border-t border-border-light">
                <div className="text-xs text-accent px-2 py-1 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 18c-1.657 0-3-1.343-3-3s1.343-3 3-3m-9 9a9 9 0 019-9" />
                  </svg>
                  Yahoo Finance (en tiempo real)
                </div>
                {yahooSearchResults.map(result => (
                  <button
                    key={result.symbol}
                    onClick={() => handleSelectYahooFund(result)}
                    className="w-full text-left px-3 py-2 hover:bg-surface-raised rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-accent-secondary font-mono text-sm">{result.symbol}</span>
                      <span className="text-xs text-text-muted bg-surface px-2 py-0.5 rounded">{result.type}</span>
                    </div>
                    <div className="text-text-secondary text-xs truncate">{result.name}</div>
                  </button>
                ))}
              </div>
            )}

            {!isSearchingYahoo && yahooSearchResults.length === 0 && localFunds.length === 0 && search.length >= 2 && (
              <div className="p-4 text-center text-text-muted">
                No se encontraron resultados
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Fund Preview */}
      {selectedFund && (
        <div className="glass-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-mono font-bold">{selectedFund.shortName}</span>
                {selectedFund.yahooTicker && (
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">LIVE</span>
                )}
              </div>
              <div className="text-text-secondary text-sm">{selectedFund.name}</div>
              <div className="text-text-muted text-xs">{selectedFund.provider}</div>
            </div>
            <button
              onClick={() => setSelectedFund(null)}
              className="text-text-muted hover:text-accent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Porcentaje</span>
                <span className="text-accent font-mono">{weight}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={Math.min(remaining, 100)}
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={handleAdd}
              disabled={weight <= 0 || remaining <= 0}
              className="w-full py-3 btn-primary disabled:opacity-50"
            >
              {t('portfolio.add')} ({weight}%)
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Holdings */}
      <div className="space-y-2 mb-6">
        {portfolio.map(pos => (
          <div key={pos.fund.isin} className="glass-card p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-text font-mono text-sm">{pos.fund.shortName}</span>
                {pos.fund.yahooTicker && <span className="w-2 h-2 rounded-full bg-accent" />}
              </div>
              <div className="text-text-muted text-xs truncate">{pos.fund.name}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-accent font-mono">{pos.weight}%</div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onUpdateWeight(pos.fund.isin, Math.max(1, pos.weight - 5))}
                  className="w-8 h-8 rounded-lg bg-surface-raised text-text-muted hover:text-accent"
                >
                  -
                </button>
                <button
                  onClick={() => onUpdateWeight(pos.fund.isin, Math.min(remaining + pos.weight, pos.weight + 5))}
                  className="w-8 h-8 rounded-lg bg-surface-raised text-text-muted hover:text-accent"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveFund(pos.fund.isin)}
                  className="w-8 h-8 rounded-lg bg-surface-raised text-accent-red hover:bg-accent-red/20"
                >
                  <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v4m0-4V7m-5 4v4m0-4V7m-5 4v4m0-4V7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-accent-secondary transition-all"
            style={{ width: `${totalWeight}%` }}
          />
        </div>
      </div>

      {/* Analyze Button */}
      {isComplete && (
        <button
          onClick={onAnalyze}
          className="w-full py-4 btn-primary"
        >
          {t('portfolio.analyze')}
        </button>
      )}

      {!isComplete && portfolio.length > 0 && (
        <div className="text-center text-text-muted text-sm">
          Añade más fondos hasta completar el 100%
        </div>
      )}
    </div>
  );
}