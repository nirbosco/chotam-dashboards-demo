import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, Cell
} from 'recharts';
import {
  ArrowLeft, CalendarClock, Users, AlertCircle, Sparkles, CheckCircle2, Clock, AlertTriangle,
  FileText, ChevronLeft, Heart, UserCheck, Home, Activity, Eye
} from 'lucide-react';
import { Card } from '../components/Card.jsx';
import { MetricTile } from '../components/MetricTile.jsx';
import {
  schools, leadingTeam, recentMeetings, todayPulse, schoolWeek, schoolDimensions,
  attendanceTrend, observations, principalActions
} from '../data/mockData.js';

const school = schools.find((s) => s.id === 'ben-zvi');

export function PrincipalDashboard({ onBackToAuthority }) {
  return (
    <div className="max-w-[1480px] mx-auto px-6 py-6 space-y-5">
      <Hero onBack={onBackToAuthority} />
      <TodayPulseStrip />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <WeekStrip />
          <LeadingTeamPulse />
          <StudentPulse />
          <DimensionsPulse />
        </div>
        <div className="space-y-5">
          <NextMeetingCard />
          <RecentMeetingsCard />
          <ObservationsCard />
          <FollowUpsCard />
        </div>
      </div>
    </div>
  );
}

function Hero({ onBack }) {
  return (
    <div className="bg-chotam-blue text-white rounded-chotam p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-chotam-royal/40 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-chotam-cyan/20 rounded-full translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="relative">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white mb-2 transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
          חזרה למבט רשות
        </button>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
              <span>רשות לדוגמה</span>
              <ArrowLeft className="w-3 h-3" />
              <span className="text-white font-semibold">{school.name}</span>
            </div>
            <h1 className="text-3xl font-bold mt-2 tracking-tight">
              {school.name}
            </h1>
            <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
              {school.type} · {school.studentCount} תלמידות ותלמידים · מנהלת: {school.principal} · סמל מוסד {school.symbol} · שנה {school.cohortYear} במחזור הליווי
            </p>
          </div>
          <div className="text-right text-xs text-white/80">
            <div className="text-white font-semibold text-sm">מלווה: {school.chotamAmit}</div>
            <div className="mt-0.5">פגישה הבאה: {school.nextMeeting}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-white bg-white/10 backdrop-blur px-2.5 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-chotam-turquoise rounded-full" />
              יום חמישי, 28 במאי 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayPulseStrip() {
  return (
    <Card title="דופק היום" subtitle="עדכון אחרון: 08:42">
      <div className="grid grid-cols-4 gap-3">
        <SmallStat icon={<UserCheck className="w-4 h-4" />} label="נוכחות תלמידים" value={`${Math.round(todayPulse.attendance * 100)}%`} sub={`${Math.round(school.studentCount * todayPulse.attendance)} מתוך ${school.studentCount}`} tone="blue" />
        <SmallStat icon={<AlertCircle className="w-4 h-4" />} label="צוות חסר" value={todayPulse.staffOnReserve} sub="2 מורות במילואים/מחלה" tone="cyan" />
        <SmallStat icon={<AlertTriangle className="w-4 h-4" />} label="אירועים פתוחים מאתמול" value={todayPulse.openIncidents} sub="טיפול בעדכון אצל יועצת" tone="gold" />
        <SmallStat icon={<CalendarClock className="w-4 h-4" />} label="פגישת ליווי הבאה" value={todayPulse.nextChotamMeeting.date.split(',')[0]} sub={todayPulse.nextChotamMeeting.topic} tone="violet" />
      </div>
    </Card>
  );
}

function SmallStat({ icon, label, value, sub, tone }) {
  const toneClass = {
    blue: 'text-chotam-blue bg-chotam-blue/10',
    cyan: 'text-chotam-cyan bg-chotam-cyan/10',
    royal: 'text-chotam-royal bg-chotam-royal/10',
    turquoise: 'text-chotam-turquoise bg-chotam-turquoise/15',
    violet: 'text-chotam-violet bg-chotam-violet/10',
    gold: 'text-chotam-gold bg-chotam-gold/15'
  }[tone] || 'text-chotam-blue bg-chotam-blue/10';

  return (
    <div className="rounded-chotamSm border border-chotam-line p-3.5 bg-white">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${toneClass}`}>{icon}</div>
        <span className="text-[11px] uppercase tracking-wider font-medium text-chotam-muted leading-tight">{label}</span>
      </div>
      <div className="text-3xl font-bold text-chotam-ink mt-2 tracking-tight">{value}</div>
      <div className="text-[11px] text-chotam-muted mt-0.5 leading-relaxed">{sub}</div>
    </div>
  );
}

function WeekStrip() {
  const toneMap = {
    blue: 'bg-chotam-blue/10 text-chotam-blue border-chotam-blue/30',
    cyan: 'bg-chotam-cyan/10 text-chotam-cyan border-chotam-cyan/30',
    royal: 'bg-chotam-royal/10 text-chotam-royal border-chotam-royal/30',
    turquoise: 'bg-chotam-turquoise/15 text-chotam-turquoise border-chotam-turquoise/30',
    violet: 'bg-chotam-violet/10 text-chotam-violet border-chotam-violet/30'
  };

  return (
    <Card title="השבוע בבית הספר" subtitle="לוח אירועים, ישיבות ופגישות">
      <div className="grid grid-cols-5 gap-3">
        {schoolWeek.map((d, i) => (
          <div key={i} className={`rounded-chotamSm border p-3 ${d.date === '28.05' ? 'border-chotam-blue bg-chotam-blue/5' : 'border-chotam-line bg-chotam-paper/40'}`}>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-chotam-muted font-medium">יום {d.day}</span>
              <span className={`text-sm font-bold ${d.date === '28.05' ? 'text-chotam-blue' : 'text-chotam-slate'}`}>{d.date}</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {d.events.length > 0 ? d.events.map((e, j) => (
                <div key={j} className={`text-[11px] rounded-md px-2 py-1.5 border ${toneMap[e.tone] || toneMap.blue}`}>
                  <div className="font-semibold">{e.time}</div>
                  <div className="leading-tight mt-0.5">{e.title}</div>
                </div>
              )) : <div className="text-[11px] text-chotam-muted italic">פנוי</div>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LeadingTeamPulse() {
  return (
    <Card
      title="דופק הצוות המוביל"
      subtitle="ארבעה תיקי אחריות, ארבע שגרות שבועיות. ביחד הם מהווים את לב בית הספר."
      action={<MetricInline label="אחריות צוותית Q2" value={`${school.pulse.teamResponsibility}/5`} delta="+0.5 מ-Q1" />}
    >
      <div className="grid grid-cols-2 gap-3">
        {leadingTeam.map((m) => (
          <div key={m.id} className="rounded-chotamSm border border-chotam-line p-4 hover:bg-chotam-paper/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-chotam-ink">{m.name}</div>
                <div className="text-xs text-chotam-blue font-medium">{m.role}</div>
              </div>
              <RoutineBadge status={m.weeklyRoutineStatus} />
            </div>
            <div className="text-[11px] text-chotam-slate mt-2 leading-relaxed">{m.accountabilityArea}</div>
            <div className="mt-3 pt-3 border-t border-chotam-line">
              <div className="text-[10px] uppercase tracking-wider text-chotam-muted font-medium">החלטה אחרונה</div>
              <div className="text-xs text-chotam-ink mt-1 leading-relaxed">{m.lastDecision}</div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium">
                {m.followUp === 'בוצע' && <><CheckCircle2 className="w-3 h-3 text-chotam-turquoise" /><span className="text-chotam-turquoise">בוצע</span></>}
                {m.followUp === 'בתהליך' && <><Clock className="w-3 h-3 text-chotam-cyan" /><span className="text-chotam-cyan">בתהליך</span></>}
                {m.followUp === 'דורש מעקב' && <><AlertTriangle className="w-3 h-3 text-chotam-warm" /><span className="text-chotam-warm">דורש מעקב</span></>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-chotam-line">
        <div className="text-xs text-chotam-muted mb-2 font-medium">אחריות צוותית · מגמה רבעונית</div>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={school.trend.teamResponsibility.map((v, i) => ({ q: `Q${i + 1}`, v }))}>
            <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#dcdce5" />
            <XAxis dataKey="q" tick={{ fontSize: 10, fill: '#6b6b80', fontFamily: 'Rubik' }} />
            <YAxis domain={[2.5, 5]} tick={{ fontSize: 10, fill: '#6b6b80', fontFamily: 'Rubik' }} />
            <Tooltip />
            <Line type="monotone" dataKey="v" stroke="#0046ff" strokeWidth={3} dot={{ r: 4, fill: '#0046ff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function RoutineBadge({ status }) {
  const map = {
    'התקיימה': { c: 'text-chotam-turquoise bg-chotam-turquoise/15', l: 'שגרה התקיימה' },
    'נדחתה': { c: 'text-chotam-gold bg-chotam-gold/15', l: 'שגרה נדחתה' },
    'בוטלה': { c: 'text-chotam-red bg-chotam-red/10', l: 'שגרה בוטלה' }
  }[status];
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${map.c}`}>{map.l}</span>;
}

function MetricInline({ label, value, delta }) {
  return (
    <div className="text-right">
      <div className="text-[11px] text-chotam-muted font-medium">{label}</div>
      <div className="text-sm">
        <span className="text-chotam-ink font-bold">{value}</span>
        <span className="text-chotam-turquoise text-xs mr-2 font-semibold">{delta}</span>
      </div>
    </div>
  );
}

function StudentPulse() {
  return (
    <Card
      title="מבט על התלמידות והתלמידים"
      subtitle="נוכחות, התמדה, מעורבות, ומה שעולה מהשטח"
    >
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="נוכחות שבועית ממוצעת" value={94} unit="%" baseline={88} target={96} trend={attendanceTrend.map((d) => d.val)} accent="blue" big />
        <MetricTile label="התמדה במסגרת" value={97} unit="%" baseline={92} target={98} accent="cyan" subtle="אחוז התלמידות והתלמידים שנשארו במסגרת מאז תחילת השנה" />
        <MetricTile label="מעורבות הורים פעילה" value={71} unit="%" baseline={48} target={80} accent="turquoise" subtle="הורים שלקחו חלק בלפחות שני פורומים בית ספריים השנה" />
      </div>

      <div className="mt-5 pt-5 border-t border-chotam-line grid grid-cols-2 gap-5">
        <div>
          <div className="text-xs text-chotam-muted font-medium mb-2">נוכחות שבועית · ששת השבועות האחרונים</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#dcdce5" />
              <XAxis dataKey="w" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={[80, 100]} unit="%" />
              <Tooltip />
              <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                {attendanceTrend.map((d, i) => (
                  <Cell key={i} fill={d.val >= 93 ? '#0046ff' : '#0fb4f5'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="text-xs text-chotam-muted font-medium mb-2">פעילויות וסדנאות · השבוע</div>
          <div className="space-y-2">
            {[
              { name: 'מעגלי שיח ה\'-ו\'', count: 8, color: 'bg-chotam-blue', host: 'אורית לוי' },
              { name: 'יום הורים-תלמידים', count: 1, color: 'bg-chotam-turquoise', host: 'יוסי בן דוד' },
              { name: 'מועצת תלמידים', count: 1, color: 'bg-chotam-cyan', host: 'אורית לוי' },
              { name: 'תצפיות בית ספר', count: 3, color: 'bg-chotam-violet', host: 'תמר רוזן' }
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className={`w-2 h-8 rounded-full ${a.color}`} />
                <div className="flex-1">
                  <div className="font-semibold text-chotam-ink">{a.name}</div>
                  <div className="text-[11px] text-chotam-muted">בהובלת {a.host}</div>
                </div>
                <div className="text-xl font-bold text-chotam-blue tracking-tight">{a.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function DimensionsPulse() {
  return (
    <Card
      title="עומק בית ספרי · ששת המימדים"
      subtitle="שאלון תקופתי שמודד את עומק העבודה לאורך זמן. הקריאה נעשית בליווי המלווה הבית ספרי."
      action={<MetricInline label="ממוצע מימדים" value="3.9/5" delta="+0.7 מתחילת המחזור" />}
    >
      <div className="grid grid-cols-2 gap-5">
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={schoolDimensions}>
              <PolarGrid stroke="#dcdce5" />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: '#0a0a1a', fontFamily: 'Rubik', fontWeight: 600 }} />
              <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#6b6b80' }} />
              <Radar name="בסיס תחילת מחזור" dataKey="baseline" stroke="#dcdce5" fill="#dcdce5" fillOpacity={0.4} />
              <Radar name="Q2 · 2026" dataKey="current" stroke="#0046ff" fill="#0046ff" fillOpacity={0.35} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Rubik' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {schoolDimensions.map((d) => (
            <div key={d.dim} className="rounded-chotamSm border border-chotam-line p-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-chotam-ink">{d.dim}</span>
                <span className="text-sm">
                  <span className="font-bold text-chotam-blue">{d.current}</span>
                  <span className="text-chotam-muted text-xs"> / {d.fullMark}</span>
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-chotam-line rounded-full overflow-hidden relative">
                <div className="absolute top-0 right-0 h-full bg-chotam-line/60" style={{ width: `${((d.baseline / d.fullMark) * 100)}%` }} />
                <div className="absolute top-0 right-0 h-full bg-chotam-blue rounded-full" style={{ width: `${((d.current / d.fullMark) * 100)}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-chotam-muted mt-1 font-medium">
                <span>בסיס {d.baseline}</span>
                <span>יעד {d.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function NextMeetingCard() {
  return (
    <Card tone="blue" title="פגישת ליווי הבאה" subtitle={todayPulse.nextChotamMeeting.date}>
      <div className="text-sm font-semibold text-white leading-snug">
        {todayPulse.nextChotamMeeting.topic}
      </div>
      <div className="mt-3 pt-3 border-t border-white/20">
        <div className="text-[10px] uppercase tracking-wider text-white/70 font-medium mb-1.5">מסמך הכנה</div>
        <div className="flex items-center gap-2 text-sm text-white hover:underline cursor-default">
          <FileText className="w-4 h-4 shrink-0" />
          <span className="leading-snug">{todayPulse.nextChotamMeeting.prepDoc}</span>
        </div>
      </div>
      <button className="mt-4 w-full bg-white text-chotam-blue text-sm font-semibold py-2 rounded-chotamSm hover:bg-white/95 transition-colors">
        פתח חלל פגישה
      </button>
    </Card>
  );
}

function RecentMeetingsCard() {
  return (
    <Card title="פגישות אחרונות" subtitle="שלושת הסיכומים האחרונים">
      <div className="space-y-3">
        {recentMeetings.map((m, i) => (
          <div key={i} className="border-r-2 border-chotam-blue pr-3 py-1">
            <div className="text-[11px] text-chotam-muted font-medium">{m.date}</div>
            <div className="text-sm font-semibold text-chotam-ink mt-0.5 leading-snug">{m.topic}</div>
            <div className="text-[11px] text-chotam-slate mt-1 leading-relaxed line-clamp-2">{m.summary}</div>
            <button className="text-[11px] text-chotam-blue hover:underline mt-1 font-medium">קראי סיכום מלא</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ObservationsCard() {
  const obs = observations[0];
  return (
    <Card title="תצפית אחרונה" subtitle={`${obs.location} · ${obs.teacher} · ${obs.date}`} action={<Eye className="w-4 h-4 text-chotam-blue" />}>
      <ul className="space-y-2 text-xs">
        {obs.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2">
            {h.type === 'pos' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-chotam-turquoise mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-chotam-warm mt-0.5 shrink-0" />
            )}
            <span className="text-chotam-ink leading-relaxed">{h.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function FollowUpsCard() {
  return (
    <Card title="לטיפול שלך" subtitle={`${principalActions.length} פעולות פתוחות`}>
      <div className="space-y-2.5">
        {principalActions.map((it, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm">
            <input type="checkbox" className="mt-1 w-3.5 h-3.5 accent-chotam-blue" />
            <div className="flex-1">
              <div className="text-chotam-ink leading-snug">{it.text}</div>
              <div className="flex items-center gap-2 mt-0.5">
                {it.urgent && <span className="text-[10px] text-chotam-warm font-semibold uppercase tracking-wider">דחוף</span>}
                {it.owner && <span className="text-[10px] text-chotam-muted">{it.owner}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
