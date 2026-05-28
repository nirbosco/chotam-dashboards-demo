export function Card({ title, subtitle, action, children, className = '', tone = 'default' }) {
  const toneClass = {
    default: 'bg-chotam-card border-chotam-line',
    blue: 'bg-chotam-blue text-white border-chotam-blue',
    soft: 'bg-chotam-paper border-chotam-line/60'
  }[tone];

  const titleColor = tone === 'blue' ? 'text-white' : 'text-chotam-ink';
  const subtitleColor = tone === 'blue' ? 'text-white/70' : 'text-chotam-muted';

  return (
    <section className={`${toneClass} rounded-chotam shadow-card border ${className}`}>
      {(title || action) && (
        <header className="flex items-start justify-between px-5 pt-5 gap-3">
          <div className="min-w-0">
            {title && <h3 className={`text-base font-semibold ${titleColor} leading-tight`}>{title}</h3>}
            {subtitle && <p className={`text-xs ${subtitleColor} mt-1 leading-relaxed`}>{subtitle}</p>}
          </div>
          {action && <div className={`text-xs ${subtitleColor} shrink-0`}>{action}</div>}
        </header>
      )}
      <div className="px-5 pb-5 pt-3">{children}</div>
    </section>
  );
}
