export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="border-b border-chotam-line">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2.5 text-sm transition-colors relative ${
              value === tab.id
                ? 'text-chotam-blue font-semibold'
                : 'text-chotam-muted hover:text-chotam-ink'
            }`}
          >
            {tab.label}
            {value === tab.id && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-chotam-blue" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
