import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sparkline } from './Sparkline.jsx';

const ACCENTS = {
  blue: { text: 'text-chotam-blue', bar: 'bg-chotam-blue', spark: '#0046ff' },
  cyan: { text: 'text-chotam-cyan', bar: 'bg-chotam-cyan', spark: '#0fb4f5' },
  royal: { text: 'text-chotam-royal', bar: 'bg-chotam-royal', spark: '#3c5af0' },
  turquoise: { text: 'text-chotam-turquoise', bar: 'bg-chotam-turquoise', spark: '#23d7cd' },
  violet: { text: 'text-chotam-violet', bar: 'bg-chotam-violet', spark: '#6437eb' }
};

export function MetricTile({ label, value, unit = '', baseline, target, max, trend, accent = 'blue', subtle, big }) {
  const a = ACCENTS[accent] || ACCENTS.blue;
  const delta = baseline != null ? Math.round((value - baseline) * 10) / 10 : null;
  const trendIcon = delta == null
    ? <Minus className="w-3.5 h-3.5" />
    : delta > 0
      ? <TrendingUp className="w-3.5 h-3.5" />
      : delta < 0
        ? <TrendingDown className="w-3.5 h-3.5" />
        : <Minus className="w-3.5 h-3.5" />;

  const progress = target != null
    ? Math.min(100, Math.max(0, ((value - (baseline ?? 0)) / (target - (baseline ?? 0))) * 100))
    : null;

  const valueSize = big ? 'text-4xl' : 'text-2xl';

  return (
    <div className="rounded-chotamSm border border-chotam-line bg-white p-4 hover:shadow-cardHover transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] uppercase tracking-wider text-chotam-muted font-medium leading-tight">{label}</p>
        {delta != null && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${delta >= 0 ? 'text-chotam-turquoise' : 'text-chotam-warm'}`}>
            {trendIcon}
            {delta > 0 ? '+' : ''}{delta}
          </span>
        )}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className={`${valueSize} font-bold ${a.text} tracking-tight`}>{value}</span>
        {max != null && <span className="text-sm text-chotam-muted font-medium">/ {max}</span>}
        {unit && <span className="text-sm text-chotam-muted">{unit}</span>}
      </div>
      {trend && <div className="mt-2"><Sparkline data={trend} color={a.spark} /></div>}
      {progress != null && !trend && (
        <div className="mt-2.5">
          <div className="h-1.5 bg-chotam-line rounded-full overflow-hidden">
            <div className={`h-full ${a.bar} rounded-full transition-all`} style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-chotam-muted mt-1 font-medium">
            <span>בסיס {baseline}</span>
            <span>יעד {target}</span>
          </div>
        </div>
      )}
      {subtle && <p className="text-[11px] text-chotam-muted mt-2 leading-relaxed">{subtle}</p>}
    </div>
  );
}
