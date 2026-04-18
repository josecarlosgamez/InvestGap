import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Fund, PortfolioPosition } from '../../types';
import { FUND_DATABASE } from '../../data/funds';

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

  const totalWeight = useMemo(() => portfolio.reduce((sum, p) => sum + p.weight, 0), [portfolio]);

  const filteredFunds = useMemo(() => {
    if (search.length < 2) return [];
    return FUND_DATABASE.filter(f => 
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.shortName.toLowerCase().includes(search.toLowerCase()) ||
      f.isin.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 8);
  }, [search]);

  const handleSelectFund = (fund: Fund) => {
    setSelectedFund(fund);
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

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl text-text font-bold mb-4">{t('portfolio.title')}</h1>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowResults(true); }}
          placeholder={t('portfolio.search')}
          className="w-full p-3 bg-surface border border-border rounded-lg text-text"
          onFocus={() => setShowResults(true)}
        />
        {showResults && filteredFunds.length > 0 && (
          <div className="absolute z-10 w-full bg-surface border border-border rounded-lg mt-1 max-h-60 overflow-auto">
            {filteredFunds.map(fund => (
              <button
                key={fund.isin}
                onClick={() => handleSelectFund(fund)}
                className="w-full text-left p-3 hover:bg-surface-raised border-b border-border last:border-b-0"
              >
                <div className="text-text font-mono text-sm">{fund.shortName}</div>
                <div className="text-text-muted text-xs">{fund.name}</div>
                <div className="text-text-muted text-xs">{fund.isin} — {fund.provider}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Fund */}
      {selectedFund && (
        <div className="bg-surface border border-border rounded-lg p-4 mb-4">
          <div className="text-text font-bold">{selectedFund.name}</div>
          <div className="text-text-muted text-sm mb-3">{selectedFund.isin}</div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={100}
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-accent font-mono w-12 text-right">{weight}%</span>
          </div>
          <button
            onClick={handleAdd}
            className="w-full mt-3 py-2 bg-accent text-white rounded"
          >
            {t('portfolio.add')}
          </button>
        </div>
      )}

      {/* Portfolio List */}
      {portfolio.length > 0 && (
        <div className="space-y-2 mb-4">
          {portfolio.map(pos => (
            <div key={pos.fund.isin} className="flex items-center justify-between bg-surface border border-border rounded-lg p-3">
              <div>
                <div className="text-text font-mono text-sm">{pos.fund.shortName}</div>
                <div className="text-text-muted text-xs">{pos.fund.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  pos.fund.srri <= 2 ? 'bg-accent-green text-bg' :
                  pos.fund.srri <= 4 ? 'bg-accent-yellow text-bg' :
                  pos.fund.srri <= 6 ? 'bg-orange-500 text-white' : 'bg-accent-red text-white'
                }`}>
                  SRRI {pos.fund.srri}
                </span>
                <span className="text-accent font-mono w-12 text-right">{pos.weight}%</span>
                <button
                  onClick={() => onRemoveFund(pos.fund.isin)}
                  className="text-accent-red text-sm"
                >
                  {t('portfolio.remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between bg-surface border border-border rounded-lg p-4 mb-4">
        <span className="text-text">{t('portfolio.total')}</span>
        <span className={`font-mono text-xl ${isComplete ? 'text-accent-green' : 'text-accent-yellow'}`}>
          {totalWeight}%
        </span>
      </div>
      {!isComplete && totalWeight > 0 && (
        <p className="text-accent-yellow text-sm mb-4">{t('portfolio.warning')}</p>
      )}

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={!isComplete}
        className="w-full py-3 bg-accent text-white rounded-lg disabled:opacity-50"
      >
        {t('portfolio.analyze')}
      </button>
    </div>
  );
}