import { useMemo } from 'react';

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  showLegend?: boolean;
}

export function DonutChart({ data, size = 160, strokeWidth = 24, showLegend = true }: DonutChartProps) {
  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);
  
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
  
  const segments = useMemo(() => {
    let offset = 0;
    return data.map((item) => {
      const percent = total > 0 ? item.value / total : 0;
      const segmentLength = percent * circumference;
      const dashArray = segmentLength;
      const dashOffset = offset;
      offset += segmentLength;
      return { ...item, dashArray, dashOffset, percent };
    });
  }, [data, total, circumference]);

  const centerValue = total > 0 ? Math.round(total) : 0;
  const centerLabel = '%';
  
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} className="transform -rotate-90">
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.dashArray} ${circumference}`}
            strokeDashoffset={-seg.dashOffset}
            className="transition-all duration-500 ease-out"
            style={{ opacity: seg.value > 0 ? 1 : 0.3 }}
          />
        ))}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2 - strokeWidth / 2}
          fill="#141619"
        />
      </svg>
      {showLegend && (
        <div className="space-y-2">
          {data.filter(d => d.value > 0).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-secondary">{item.label}</span>
              <span className="text-sm font-mono text-text">{item.value.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}