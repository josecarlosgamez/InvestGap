interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  showValues?: boolean;
  height?: number;
}

export function BarChart({ 
  data, 
  maxValue = 100, 
  showValues = true,
  height = 24 
}: BarChartProps) {
  const getColor = (value: number) => {
    if (value >= 0) return '#00D68F';
    return '#FF4757';
  };

  return (
    <div className="space-y-2">
      {data.map((item, i) => {
        const width = Math.min(Math.abs(item.value) / maxValue * 100, 100);
        const isNegative = item.value < 0;
        
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm text-secondary w-28 truncate">{item.label}</span>
            <div className="flex-1 relative">
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  width: '100%'
                }}
              />
              <div 
                className="absolute top-0 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${width}%`,
                  right: isNegative ? '50%' : 'auto',
                  left: isNegative ? '50%' : '0',
                  backgroundColor: item.color || getColor(item.value)
                }}
              />
            </div>
            {showValues && (
              <span className={`text-sm font-mono w-16 text-right ${
                isNegative ? 'text-accent-red' : 'text-accent-green'
              }`}>
                {isNegative ? '' : '+'}{item.value.toFixed(1)}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface HorizontalBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
}

export function HorizontalBar({ 
  label, 
  value, 
  maxValue = 100, 
  color = '#0052FF',
  showValue = true 
}: HorizontalBarProps) {
  const width = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-secondary">{label}</span>
        {showValue && <span className="font-mono text-text">{value.toFixed(0)}%</span>}
      </div>
      <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}