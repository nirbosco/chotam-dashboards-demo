import {
  Building2, GraduationCap, Bell, Search, Bot, Settings, School, Link2, BookOpen, UserCog,
  LineChart
} from 'lucide-react';

const PRIMARY_TABS = [
  { id: 'authority', label: 'מבט רשות', icon: Building2 },
  { id: 'school', label: 'מבט מנהלת', icon: GraduationCap },
  { id: 'measurement', label: 'מדידה והערכה', icon: LineChart }
];

const SECONDARY_TABS = [
  { id: 'institutions', label: 'ניהול מוסדות', icon: School },
  { id: 'agent', label: 'סוכן חכם', icon: Bot },
  { id: 'knowledge', label: 'מרכז הידע', icon: BookOpen },
  { id: 'partners', label: 'מלוות ומלווי בתי ספר', icon: UserCog },
  { id: 'links', label: 'לינקים', icon: Link2 },
  { id: 'admin', label: 'ניהול מערכת', icon: Settings }
];

export function TopNav({ view, onChange, breadcrumb }) {
  return (
    <header className="bg-white border-b border-chotam-line sticky top-0 z-30">
      <div className="max-w-[1480px] mx-auto px-6">
        <div className="h-[88px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/chotam-logo.png" alt="חותם" className="h-14 w-auto" />
            <div className="h-10 w-px bg-chotam-line" />
            <div className="leading-tight">
              <div className="text-[15px] font-semibold text-chotam-ink">ליווי בתי ספר ורשויות</div>
              <div className="text-xs text-chotam-muted mt-0.5">{breadcrumb}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-1.5 text-chotam-slate hover:text-chotam-blue transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-1.5 text-chotam-slate hover:text-chotam-blue transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-chotam-warm rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-2.5 pr-4 border-r border-chotam-line">
              <div className="text-right leading-tight">
                <div className="text-sm text-chotam-ink font-semibold">תמר רוזן</div>
                <div className="text-[11px] text-chotam-muted">מלווה בית ספרי · אזור צפון</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-chotam-blue/10 flex items-center justify-center text-chotam-blue font-bold text-sm">תר</div>
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
          {PRIMARY_TABS.map((t) => (
            <NavTab key={t.id} tab={t} active={view === t.id} onClick={() => onChange(t.id)} primary />
          ))}
          <div className="h-5 w-px bg-chotam-line mx-2 self-center" />
          {SECONDARY_TABS.map((t) => (
            <NavTab key={t.id} tab={t} active={view === t.id} onClick={() => onChange(t.id)} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavTab({ tab, active, onClick, primary }) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap ${
        active
          ? 'text-chotam-blue border-chotam-blue font-semibold'
          : primary
            ? 'text-chotam-slate border-transparent hover:text-chotam-blue hover:border-chotam-line font-medium'
            : 'text-chotam-muted border-transparent hover:text-chotam-slate hover:border-chotam-line'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {tab.label}
    </button>
  );
}
