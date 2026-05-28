import { Bot, Settings, School, Link2, BookOpen, UserCog } from 'lucide-react';

const PAGE_META = {
  agent: { icon: Bot, title: 'סוכן חכם', sub: 'עוזר חותם בליווי בתי הספר והרשויות' },
  admin: { icon: Settings, title: 'ניהול מערכת', sub: 'הגדרות, הרשאות וניהול תפקידים' },
  institutions: { icon: School, title: 'ניהול מוסדות', sub: 'הוספה, עריכה ותחזוקה של מוסדות במחזורי הליווי' },
  links: { icon: Link2, title: 'לינקים', sub: 'קישורים שימושיים שמשמשים את צוות הליווי' },
  knowledge: { icon: BookOpen, title: 'מרכז הידע', sub: 'מדריכים, רובריקות, מסמכי תפיסה וכלי עבודה' },
  partners: { icon: UserCog, title: 'מלוות ומלווי בתי ספר', sub: 'צוות הליווי הארצי של חותם, התמחויות ועומסים' }
};

export function PlaceholderPage({ view }) {
  const meta = PAGE_META[view];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <div className="max-w-[1480px] mx-auto px-6 py-16">
      <div className="bg-white rounded-chotam border border-chotam-line p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-chotam-blue/10 text-chotam-blue mx-auto flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-chotam-ink mt-5 tracking-tight">{meta.title}</h2>
        <p className="text-sm text-chotam-muted mt-2">{meta.sub}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-chotam-blue bg-chotam-blue/10 px-3 py-1.5 rounded-full font-medium">
          <span className="w-1.5 h-1.5 bg-chotam-blue rounded-full" />
          בפיתוח · יוטמע בשלב הבא
        </div>
      </div>
    </div>
  );
}
