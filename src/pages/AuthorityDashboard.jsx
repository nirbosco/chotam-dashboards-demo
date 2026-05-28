import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip,
  ScatterChart, Scatter, ZAxis, LineChart, Line, ReferenceLine
} from 'recharts';
import {
  Calendar, Users, AlertTriangle, Star, Sparkles, FileText, ArrowLeft, MoreHorizontal,
  CheckCircle2, TrendingUp, Heart, Home, UserCheck, Activity
} from 'lucide-react';
import { Card } from '../components/Card.jsx';
import { Tabs } from '../components/Tabs.jsx';
import { authority, schools, alerts, successStories } from '../data/mockData.js';

const TABS = [
  { id: 'overview', label: 'תמונת מצב' },
  { id: 'pulse', label: 'דופק רשותי' },
  { id: 'routines', label: 'שגרות ליווי' },
  { id: 'compare', label: 'מגמות והשוואה' }
];

export function AuthorityDashboard({ onOpenSchool }) {
  const [tab, setTab] = useState('overview');
  const reported = schools.filter((s) => s.lastUpdate === 'היום' || s.lastUpdate === 'אתמול').length;
  const avgAttendance = Math.round(schools.reduce((s, x) => s + x.pulse.attendance, 0) / schools.length * 100);
  const avgRetention = Math.round(schools.reduce((s, x) => s + x.pulse.retention, 0) / schools.length * 100);

  return (
    <div className="max-w-[1480px] mx-auto px-6 py-6">
      <Hero />

      <div className="mt-5 grid grid-cols-4 gap-3 mb-6">
        <KPI icon={<Home className="w-4 h-4" />} label="בתי ספר בליווי" value={schools.length} sub={'יסודי וחט"ב'} />
        <KPI icon={<Users className="w-4 h-4" />} label="תלמידות ותלמידים" value={authority.totalStudents.toLocaleString('he-IL')} sub="ברשות לדוגמה" />
        <KPI icon={<UserCheck className="w-4 h-4" />} label="נוכחות ממוצעת" value={`${avgAttendance}%`} sub={`התמדה ${avgRetention}%`} accent />
        <KPI icon={<Calendar className="w-4 h-4" />} label="פגישת מטה רשותי" value={authority.nextAuthorityForum} sub="צוות ההיגוי הרשותי" />
      </div>

      <Tabs tabs={TABS} value={tab} onChange={setTab} />

      <div className="mt-5">
        {tab === 'overview' && <OverviewTab onOpenSchool={onOpenSchool} />}
        {tab === 'pulse' && <PulseTab />}
        {tab === 'routines' && <RoutinesTab />}
        {tab === 'compare' && <CompareTab />}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-chotam-blue text-white rounded-chotam p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-chotam-royal/30 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
            <span>חותם</span>
            <ArrowLeft className="w-3 h-3" />
            <span>מבט רשות</span>
            <ArrowLeft className="w-3 h-3" />
            <span className="text-white font-semibold">רשות לדוגמה</span>
          </div>
          <h1 className="text-3xl font-bold mt-2 tracking-tight">
            רשות לדוגמה
          </h1>
          <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
            {authority.cohortName} · שנה {authority.cycleYear} מתוך {authority.totalCycleYears} · מלווה בית ספרי: {authority.amitName} · עדכון אחרון: {authority.lastSync}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 text-xs text-white bg-white/10 backdrop-blur px-3 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 bg-chotam-turquoise rounded-full animate-pulse" />
            מסונכרן עם הרשות
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ icon, label, value, sub, accent }) {
  return (
    <div className={`rounded-chotamSm border bg-white px-4 py-3.5 ${accent ? 'border-chotam-blue/30' : 'border-chotam-line'}`}>
      <div className="flex items-center gap-2 text-chotam-muted">
        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${accent ? 'bg-chotam-blue/10 text-chotam-blue' : 'bg-chotam-paper text-chotam-slate'}`}>{icon}</div>
        <span className="text-[11px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <div className={`text-3xl font-bold ${accent ? 'text-chotam-blue' : 'text-chotam-ink'} mt-2 tracking-tight`}>{value}</div>
      <div className="text-xs text-chotam-muted mt-0.5">{sub}</div>
    </div>
  );
}

function StatusDot({ status }) {
  const map = {
    'היום': 'bg-chotam-turquoise',
    'אתמול': 'bg-chotam-cyan',
    'לפני יומיים': 'bg-chotam-gold',
    'לפני 3 ימים': 'bg-chotam-warm'
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${map[status] || 'bg-chotam-muted'}`} />;
}

function MiniBar({ value, color = 'bg-chotam-blue', max = 100 }) {
  return (
    <span className="inline-block w-14 h-1.5 bg-chotam-line rounded-full overflow-hidden align-middle">
      <span className={`block h-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </span>
  );
}

function OverviewTab({ onOpenSchool }) {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 space-y-5">
        <Card title="בתי הספר בליווי" subtitle="לחיצה על שורה פותחת את מבט המנהלת">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-[11px] text-chotam-muted border-b border-chotam-line uppercase tracking-wider">
                <th className="font-medium pb-2 pr-2">בית ספר</th>
                <th className="font-medium pb-2">סוג</th>
                <th className="font-medium pb-2">תלמ'</th>
                <th className="font-medium pb-2">נוכחות</th>
                <th className="font-medium pb-2">אקלים</th>
                <th className="font-medium pb-2">אחריות צוות</th>
                <th className="font-medium pb-2">שגרות</th>
                <th className="font-medium pb-2">עדכון</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => s.id === 'ben-zvi' && onOpenSchool(s.id)}
                  className={`border-b border-chotam-line/40 hover:bg-chotam-paper/60 transition-colors ${s.id === 'ben-zvi' ? 'cursor-pointer' : ''}`}
                >
                  <td className="py-3 pr-2">
                    <div className="font-semibold text-chotam-ink">{s.name}</div>
                    <div className="text-[11px] text-chotam-muted">{s.principal}{s.id === 'ben-zvi' && <span className="mr-2 text-chotam-blue">· לחצי לפתיחה</span>}</div>
                  </td>
                  <td className="py-3 text-chotam-slate">{s.type}</td>
                  <td className="py-3 text-chotam-ink font-medium">{s.studentCount}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <MiniBar value={s.pulse.attendance * 100} color="bg-chotam-blue" />
                      <span className="text-xs text-chotam-ink font-medium">{Math.round(s.pulse.attendance * 100)}%</span>
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <MiniBar value={s.pulse.climate} color="bg-chotam-cyan" max={5} />
                      <span className="text-xs text-chotam-ink font-medium">{s.pulse.climate}</span>
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <MiniBar value={s.pulse.teamResponsibility} color="bg-chotam-royal" max={5} />
                      <span className="text-xs text-chotam-ink font-medium">{s.pulse.teamResponsibility}</span>
                    </span>
                  </td>
                  <td className="py-3 text-chotam-ink font-medium">{s.pulse.routinesScore}%</td>
                  <td className="py-3 text-chotam-muted text-xs">
                    <span className="inline-flex items-center gap-2">
                      <StatusDot status={s.lastUpdate} />
                      {s.lastUpdate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="קריאה רוחבית · המלווה הבית ספרי" subtitle="מבוסס על נתוני 9 בתי הספר במחזור" action={<span className="inline-flex items-center gap-1 text-chotam-blue font-medium"><Sparkles className="w-3.5 h-3.5" /> מעודכן היום</span>}>
          <div className="space-y-3 text-sm text-chotam-ink leading-relaxed">
            <p>
              <strong className="text-chotam-blue">מה עובד טוב ברשות:</strong> ב-7 מתוך 9 בתי הספר חל שיפור עקבי במדד האחריות הצוותית של הצוות המוביל לאורך השנה האחרונה. השיפור הזה מקדים בכ-3 רבעונים את השיפור באקלים ובהישגים. זה דפוס שאנחנו מזהים שוב ושוב.
            </p>
            <p>
              <strong className="text-chotam-blue">מה מבקש תשומת לב:</strong> ברוש מציג ירידה בנוכחות צוות ובמעורבות הורים בו זמנית. בפגישה הקרובה עם יעל מורן כדאי לבחון אם זה משבר נקודתי או דפוס.
            </p>
            <p>
              <strong className="text-chotam-blue">הזדמנות לחיבור:</strong> בית ספר ד', א' ו-ז' מציגים יוזמות דומות שמובילות הצוותים המובילים שלהם. שווה לחשוב על מפגש מחזורי שיאפשר להם ללמוד אחד מהשני.
            </p>
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <Card title="נקודות תשומת לב" subtitle={`${alerts.length} פתוחות השבוע`} action={<AlertTriangle className="w-4 h-4 text-chotam-warm" />}>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="border-r-2 border-chotam-warm pr-3 py-1">
                <div className="text-[11px] text-chotam-muted font-medium uppercase tracking-wider">{a.school}</div>
                <div className="text-sm font-semibold text-chotam-ink mt-0.5 leading-snug">{a.title}</div>
                <div className="text-xs text-chotam-slate mt-1 leading-relaxed">{a.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="סיפורי הצלחה" subtitle="ידע להפצה במחזור" action={<Star className="w-4 h-4 text-chotam-gold" />}>
          <div className="space-y-3">
            {successStories.map((s, i) => (
              <div key={i} className="border-r-2 border-chotam-turquoise pr-3 py-1">
                <div className="text-[11px] text-chotam-muted font-medium uppercase tracking-wider">{s.school}</div>
                <div className="text-sm font-semibold text-chotam-ink mt-0.5 leading-snug">{s.title}</div>
                <div className="text-xs text-chotam-slate mt-1 leading-relaxed">{s.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="מעבדת חותם" subtitle="מסמכים אחרונים מהשטח">
          <div className="space-y-2">
            {[
              { name: 'פרוטוקול ועדת היגוי 14.5.26', school: 'רשות' },
              { name: 'רובריקת תצפית כיתה מעודכנת', school: 'בית ספר א\'' },
              { name: 'תכנון יום הורים-תלמידים', school: 'בית ספר א\'' }
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm hover:bg-chotam-paper rounded-md p-1.5 -mx-1.5 transition-colors cursor-default">
                <FileText className="w-4 h-4 text-chotam-blue flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-chotam-ink truncate font-medium">{d.name}</div>
                  <div className="text-[11px] text-chotam-muted">{d.school}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function PulseTab() {
  const dims = [
    { key: 'attendance', label: 'נוכחות תלמידים', accent: 'blue', icon: <UserCheck className="w-4 h-4" />, unit: '%', mult: 100 },
    { key: 'retention', label: 'התמדה במסגרת', accent: 'cyan', icon: <Heart className="w-4 h-4" />, unit: '%', mult: 100 },
    { key: 'parentEngagement', label: 'מעורבות הורים', accent: 'turquoise', icon: <Home className="w-4 h-4" />, unit: '%', mult: 100 },
    { key: 'climate', label: 'אקלים בית ספרי', accent: 'royal', icon: <Activity className="w-4 h-4" />, unit: '/5', mult: 1, max: 5 },
    { key: 'agency', label: 'אייג\'נסי תלמיד', accent: 'violet', icon: <Sparkles className="w-4 h-4" />, unit: '/5', mult: 1, max: 5 },
    { key: 'teamResponsibility', label: 'אחריות צוותית', accent: 'blue', icon: <Users className="w-4 h-4" />, unit: '/5', mult: 1, max: 5 }
  ];

  const accentMap = { blue: '#0046ff', cyan: '#0fb4f5', turquoise: '#23d7cd', royal: '#3c5af0', violet: '#6437eb' };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-6 gap-3">
        {dims.map((d) => {
          const avg = schools.reduce((s, x) => s + x.pulse[d.key], 0) / schools.length * d.mult;
          return (
            <div key={d.key} className="rounded-chotamSm border border-chotam-line bg-white p-4">
              <div className="flex items-center gap-2 text-chotam-muted">
                <div className="w-7 h-7 rounded-md bg-chotam-paper text-chotam-blue flex items-center justify-center">{d.icon}</div>
                <span className="text-[11px] uppercase tracking-wider font-medium leading-tight">{d.label}</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-chotam-ink tracking-tight">
                {Math.round(avg * 10) / 10}{d.unit}
              </div>
              <div className="text-[11px] text-chotam-muted mt-0.5">ממוצע רשותי</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {dims.slice(0, 4).map((d) => (
          <Card key={d.key} title={d.label} subtitle="פירוט לפי בית ספר">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart
                data={schools.map((s) => ({ name: s.name, value: Math.round(s.pulse[d.key] * d.mult * 10) / 10 }))}
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#dcdce5" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} interval={0} angle={-25} textAnchor="end" height={56} />
                <YAxis tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={d.max ? [0, d.max] : [0, 100]} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill={accentMap[d.accent]}>
                  {schools.map((s, i) => (
                    <Cell key={i} fill={accentMap[d.accent]} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RoutinesTab() {
  const schedule = [
    { day: 'ב\'', date: '02.06', school: 'בית ספר א\'', amit: 'תמר רוזן', topic: 'דיון רבעוני: שגרות צוות מוביל' },
    { day: 'ג\'', date: '03.06', school: 'אורן', amit: 'תמר רוזן', topic: 'אחריות צוותית: שאלון Q2' },
    { day: 'ד\'', date: '04.06', school: 'ברוש', amit: 'יעל מורן', topic: 'נוכחות צוות ומעורבות הורים' },
    { day: 'ה\'', date: '05.06', school: 'הרב מימון', amit: 'תמר רוזן', topic: 'הפצת ידע: יוזמת "בוקר טוב לכיתה"' },
    { day: 'ב\'', date: '09.06', school: 'הדס', amit: 'תמר רוזן', topic: 'שותפות הורים: סמינר קיץ' }
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      <Card title="לוח פגישות מלוות ומלווי בתי ספר" subtitle="השבועיים הקרובים" className="col-span-2">
        <div className="space-y-2">
          {schedule.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-2.5 px-3 rounded-chotamSm hover:bg-chotam-paper transition-colors">
              <div className="w-14 text-center flex-shrink-0">
                <div className="text-[11px] text-chotam-muted font-medium">יום {item.day}</div>
                <div className="text-base font-bold text-chotam-blue">{item.date}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-chotam-ink">{item.school}</div>
                <div className="text-xs text-chotam-slate mt-0.5">{item.topic}</div>
              </div>
              <div className="text-xs text-chotam-slate bg-chotam-paper rounded-full px-3 py-1 font-medium">{item.amit}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="עומסי מלווים" subtitle="התפלגות שעות שבועיות">
        {[
          { name: 'תמר רוזן', schools: 5, hours: 22 },
          { name: 'יעל מורן', schools: 4, hours: 18 }
        ].map((a, i) => (
          <div key={i} className="py-3 border-b border-chotam-line last:border-0">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-chotam-ink">{a.name}</span>
              <span className="text-xs text-chotam-muted">{a.schools} בתי"ס · {a.hours} ש"ש</span>
            </div>
            <div className="h-2 bg-chotam-line rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-chotam-blue rounded-full" style={{ width: `${(a.hours / 25) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-chotam-line">
          <div className="text-xs text-chotam-muted">קיבולת מקסימלית: 25 ש"ש למלווה</div>
        </div>
      </Card>
    </div>
  );
}

function CompareTab() {
  const scatterData = schools.map((s) => ({
    name: s.name,
    teamResponsibility: s.pulse.teamResponsibility,
    climate: s.pulse.climate,
    students: s.studentCount
  }));

  return (
    <div className="grid grid-cols-3 gap-5">
      <Card title="אחריות צוותית מול אקלים בית ספרי" subtitle="הציר האנכי: אקלים בית ספרי. הציר האופקי: אחריות צוותית. גודל הסמן: מספר תלמידים. הקו האדום: ממוצע ארצי." className="col-span-2">
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 16, right: 16, bottom: 24, left: 8 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#dcdce5" />
            <XAxis type="number" dataKey="teamResponsibility" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={[3, 5]} label={{ value: 'אחריות צוותית /5', position: 'insideBottom', offset: -8, style: { fontSize: 11, fill: '#6b6b80' } }} />
            <YAxis type="number" dataKey="climate" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={[3, 5]} label={{ value: 'אקלים בית ספרי /5', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b6b80' } }} />
            <ZAxis type="number" dataKey="students" range={[100, 400]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white rounded-chotamSm p-2.5 border border-chotam-line text-sm shadow-cardHover">
                    <div className="font-semibold text-chotam-ink">{d.name}</div>
                    <div className="text-xs text-chotam-muted">אחריות {d.teamResponsibility} · אקלים {d.climate} · {d.students} תלמ'</div>
                  </div>
                );
              }}
            />
            <ReferenceLine y={3.8} stroke="#ff6b3d" strokeDasharray="4 4" label={{ value: 'ממוצע ארצי', fill: '#ff6b3d', fontSize: 11, position: 'insideTopLeft' }} />
            <Scatter data={scatterData} fill="#0046ff" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      <Card title="מעורבות הורים" subtitle="אחוז ההורים המעורבים פעיל בכל בית ספר">
        <div className="space-y-2.5">
          {[...schools]
            .sort((a, b) => b.pulse.parentEngagement - a.pulse.parentEngagement)
            .map((s) => (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <span className="w-24 text-chotam-ink truncate font-medium">{s.name}</span>
                <div className="flex-1 h-2 bg-chotam-line rounded-full overflow-hidden">
                  <div className="h-full bg-chotam-turquoise" style={{ width: `${s.pulse.parentEngagement * 100}%` }} />
                </div>
                <span className="w-10 text-left text-chotam-ink font-semibold">{Math.round(s.pulse.parentEngagement * 100)}%</span>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
