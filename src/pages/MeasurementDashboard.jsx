import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, ScatterChart, Scatter, ZAxis, ReferenceLine, Cell, ComposedChart, Area
} from 'recharts';
import {
  BookOpen, Calculator, TrendingUp, Target, GraduationCap, Sparkles, ArrowLeft,
  ArrowUpRight, FileText, Activity
} from 'lucide-react';
import { Card } from '../components/Card.jsx';
import { MetricTile } from '../components/MetricTile.jsx';
import { Tabs } from '../components/Tabs.jsx';
import {
  schools, measurement, byGrade, distribution, yearTrend, cohortCorrelation, cohortAverages
} from '../data/mockData.js';

const school = schools.find((s) => s.id === 'ben-zvi');

const TABS = [
  { id: 'school', label: 'מבט בית ספר' },
  { id: 'integration', label: 'שילוב מדדים' },
  { id: 'cohort', label: 'השוואה במחזור' }
];

export function MeasurementDashboard() {
  const [tab, setTab] = useState('school');
  return (
    <div className="max-w-[1480px] mx-auto px-6 py-6 space-y-5">
      <Hero />
      <KPIs />
      <Tabs tabs={TABS} value={tab} onChange={setTab} />
      <div>
        {tab === 'school' && <SchoolTab />}
        {tab === 'integration' && <IntegrationTab />}
        {tab === 'cohort' && <CohortTab />}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-chotam-blue text-white rounded-chotam p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-chotam-royal/30 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-chotam-cyan/20 rounded-full translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
          <span>חותם</span>
          <ArrowLeft className="w-3 h-3" />
          <span>מדידה והערכה</span>
          <ArrowLeft className="w-3 h-3" />
          <span className="text-white font-semibold">{school.name}</span>
        </div>
        <h1 className="text-3xl font-bold mt-2 tracking-tight">
          מדידה והערכה · {school.name}
        </h1>
        <p className="text-sm text-white/80 mt-1.5 leading-relaxed max-w-3xl">
          הישגי שפת אם ומתמטיקה, משולבים עם מדדי האחריות הצוותית, האקלים, ומעורבות ההורים. עבור צוות בית הספר ועמית.ת הליווי, ההישגים אינם נמדדים בפני עצמם אלא נקראים יחד עם השכבה התשתיתית שמייצרת אותם.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-white/70">מקורות:</span>
          {measurement.sources.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-white/10 backdrop-blur px-2.5 py-1 rounded-full text-white font-medium">
              {s}
            </span>
          ))}
          <span className="text-white/60 mr-2">· נכון ל-{measurement.asOf}</span>
        </div>
      </div>
    </div>
  );
}

function KPIs() {
  const { current, baseline, target } = measurement;
  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricTile label="שפת אם · ממוצע" value={current.languageAvg} baseline={baseline.languageAvg} target={target.languageAvg} accent="blue" big />
      <MetricTile label="מתמטיקה · ממוצע" value={current.mathAvg} baseline={baseline.mathAvg} target={target.mathAvg} accent="cyan" big />
      <MetricTile label="מעל סף בסיסי" value={current.aboveBasic} unit="%" baseline={baseline.aboveBasic} target={target.aboveBasic} accent="turquoise" big />
      <MetricTile label="שונות פנים-בית-ספרית" value={current.variance} unit="נק'" baseline={baseline.variance} target={target.variance} accent="royal" big subtle="נמוך יותר = פער קטן יותר בין רבעוני התלמידים" />
    </div>
  );
}

function SchoolTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <Card title="התפלגות שפת אם" subtitle="אחוז תלמידים בכל רמה, בסיס מול עכשיו">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={distribution.language}>
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#dcdce5" />
              <XAxis dataKey="bucket" tick={{ fontSize: 12, fill: '#0a0a1a', fontFamily: 'Rubik', fontWeight: 500 }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} unit="%" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Rubik' }} />
              <Bar dataKey="baseline" name="בסיס תחילת מחזור" fill="#dcdce5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="current" name="עכשיו" fill="#0046ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="התפלגות מתמטיקה" subtitle="אחוז תלמידים בכל רמה, בסיס מול עכשיו">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={distribution.math}>
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#dcdce5" />
              <XAxis dataKey="bucket" tick={{ fontSize: 12, fill: '#0a0a1a', fontFamily: 'Rubik', fontWeight: 500 }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} unit="%" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Rubik' }} />
              <Bar dataKey="baseline" name="בסיס תחילת מחזור" fill="#dcdce5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="current" name="עכשיו" fill="#0fb4f5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="פירוט לפי שכבה" subtitle="הקשר בין הישגי כיתה לאקלים ולאחריות הצוותית של הצוות החינוכי של השכבה">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right text-[11px] text-chotam-muted border-b border-chotam-line uppercase tracking-wider">
              <th className="font-medium pb-2 pr-2">שכבה</th>
              <th className="font-medium pb-2">תלמידים</th>
              <th className="font-medium pb-2">שפת אם</th>
              <th className="font-medium pb-2">מתמטיקה</th>
              <th className="font-medium pb-2">אקלים</th>
              <th className="font-medium pb-2">אחריות צוותית שכבתית</th>
            </tr>
          </thead>
          <tbody>
            {byGrade.map((g) => (
              <tr key={g.grade} className="border-b border-chotam-line/40 hover:bg-chotam-paper/60 transition-colors">
                <td className="py-3 pr-2 font-bold text-chotam-blue text-lg">{g.grade}</td>
                <td className="py-3 text-chotam-ink font-medium">{g.students}</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-2">
                    <MiniBar value={g.language} color="bg-chotam-blue" />
                    <span className="text-sm font-semibold text-chotam-ink">{g.language}</span>
                  </span>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-2">
                    <MiniBar value={g.math} color="bg-chotam-cyan" />
                    <span className="text-sm font-semibold text-chotam-ink">{g.math}</span>
                  </span>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-2">
                    <MiniBar value={g.climate} color="bg-chotam-royal" max={5} />
                    <span className="text-sm font-semibold text-chotam-ink">{g.climate}</span>
                  </span>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-2">
                    <MiniBar value={g.teamResp} color="bg-chotam-violet" max={5} />
                    <span className="text-sm font-semibold text-chotam-ink">{g.teamResp}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card
        title="קריאת נתונים · מבט המלווה הבית ספרי"
        subtitle="הסבר שמופיע אוטומטית כאשר נתון חורג מהמגמה"
        action={<span className="inline-flex items-center gap-1 text-chotam-blue font-medium"><Sparkles className="w-3.5 h-3.5" /> מעודכן</span>}
      >
        <div className="space-y-3 text-sm text-chotam-ink leading-relaxed">
          <p>
            <strong className="text-chotam-blue">הקשר הבולט:</strong> בשכבת ה' רמת ההישגים נמוכה ביחס לשאר השכבות. במקביל, מדד האקלים והאחריות הצוותית של צוות השכבה נמוכים יותר. הקשר עולה גם בשכבות אחרות במחזור, ומחזק את הקריאה שמסוגלות צוותית קודמת להישגים.
          </p>
          <p>
            <strong className="text-chotam-blue">תזוזה לחיוב:</strong> שיעור התלמידים בקצה התחתון של ההתפלגות במתמטיקה ירד מ-32% ל-18%. הירידה הזו תואמת זמנית את הפעלת שגרת התכנון המשותף של רכזת פדגוגית עם צוותי השכבות, שהתחילה ברבעון Q4 של 2025.
          </p>
          <p>
            <strong className="text-chotam-blue">המלצה לפגישה הקרובה:</strong> לבחון עם רכזת השכבה של ה' איזה תיקוף נדרש לצוות החינוכי כדי לחזק את האחריות ההדדית, מתוך הנחה שזה התנאי המקדים לשיפור במדידה הבאה.
          </p>
        </div>
      </Card>
    </div>
  );
}

function IntegrationTab() {
  return (
    <div className="space-y-5">
      <Card title="מגמה רב-שנתית · הישגים יחד עם המסוגלות הצוותית" subtitle="ארבע שנות מחזור הליווי. ההישגים בכחול ובתכלת, האחריות הצוותית והאקלים בקווים על אותו ציר זמן.">
        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart data={yearTrend}>
            <CartesianGrid strokeDasharray="2 4" stroke="#dcdce5" />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#0a0a1a', fontFamily: 'Rubik', fontWeight: 600 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={[30, 80]} label={{ value: 'הישגים', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b6b80' } }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={[2.5, 5]} label={{ value: 'מדדי חותם', angle: 90, position: 'insideRight', style: { fontSize: 11, fill: '#6b6b80' } }} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white rounded-chotamSm p-3 border border-chotam-line text-sm shadow-cardHover min-w-[200px]">
                    <div className="font-bold text-chotam-ink text-base">{label}</div>
                    <div className="text-xs text-chotam-blue font-medium mt-1">{d.milestone}</div>
                    <div className="mt-2 pt-2 border-t border-chotam-line space-y-1 text-xs">
                      <div>שפת אם: <strong>{d.language}</strong></div>
                      <div>מתמטיקה: <strong>{d.math}</strong></div>
                      <div>אחריות צוותית: <strong>{d.teamResp}/5</strong></div>
                      <div>אקלים: <strong>{d.climate}/5</strong></div>
                    </div>
                  </div>
                );
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Rubik' }} />
            <Bar yAxisId="left" dataKey="language" name="שפת אם" fill="#0046ff" radius={[6, 6, 0, 0]} barSize={28} />
            <Bar yAxisId="left" dataKey="math" name="מתמטיקה" fill="#0fb4f5" radius={[6, 6, 0, 0]} barSize={28} />
            <Line yAxisId="right" type="monotone" dataKey="teamResp" name="אחריות צוותית" stroke="#6437eb" strokeWidth={3} dot={{ r: 5, fill: '#6437eb' }} />
            <Line yAxisId="right" type="monotone" dataKey="climate" name="אקלים" stroke="#23d7cd" strokeWidth={3} dot={{ r: 5, fill: '#23d7cd' }} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-chotam-line">
          <div className="text-xs text-chotam-muted font-medium mb-2 uppercase tracking-wider">אבני דרך בליווי</div>
          <div className="grid grid-cols-4 gap-3">
            {yearTrend.map((y, i) => (
              <div key={i} className="border-r-2 border-chotam-blue pr-3">
                <div className="text-sm font-bold text-chotam-blue">{y.year}</div>
                <div className="text-[12px] text-chotam-ink mt-0.5 leading-snug">{y.milestone}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-5">
        <CorrelationScatter
          title="אחריות צוותית ↔ הישגי מתמטיקה"
          subtitle="כל נקודה היא בית ספר במחזור. כיוון העלייה מצביע על הקשר."
          xKey="teamResp"
          yKey="math"
          xLabel="אחריות צוותית /5"
          yLabel="מתמטיקה"
          color="#0046ff"
          xDomain={[3, 5]}
          yDomain={[40, 75]}
        />
        <CorrelationScatter
          title="אקלים ↔ הישגי שפת אם"
          subtitle="הקשר בין אקלים בית ספרי לבין הישגי שפה"
          xKey="climate"
          yKey="language"
          xLabel="אקלים /5"
          yLabel="שפת אם"
          color="#0fb4f5"
          xDomain={[3, 5]}
          yDomain={[40, 80]}
        />
        <CorrelationScatter
          title="מעורבות הורים ↔ הישגי מתמטיקה"
          subtitle="הקשר בין מעורבות הורים פעילה לבין הישגי מתמטיקה"
          xKey="parentEng"
          yKey="math"
          xLabel="מעורבות הורים /5"
          yLabel="מתמטיקה"
          color="#23d7cd"
          xDomain={[2, 5]}
          yDomain={[40, 75]}
        />
        <CorrelationScatter
          title="אייג'נסי תלמיד ↔ הישגי שפת אם"
          subtitle="הקשר בין אייג'נסי תלמיד לבין הישגי שפה"
          xKey="agency"
          yKey="language"
          xLabel="אייג'נסי /5"
          yLabel="שפת אם"
          color="#6437eb"
          xDomain={[3, 5]}
          yDomain={[40, 80]}
        />
      </div>
    </div>
  );
}

function CorrelationScatter({ title, subtitle, xKey, yKey, xLabel, yLabel, color, xDomain, yDomain }) {
  return (
    <Card title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart margin={{ top: 12, right: 16, bottom: 24, left: 8 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#dcdce5" />
          <XAxis type="number" dataKey={xKey} domain={xDomain} tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} label={{ value: xLabel, position: 'insideBottom', offset: -10, style: { fontSize: 11, fill: '#6b6b80' } }} />
          <YAxis type="number" dataKey={yKey} domain={yDomain} tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b6b80' } }} />
          <ZAxis type="number" dataKey="students" range={[80, 350]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-white rounded-chotamSm p-2.5 border border-chotam-line text-sm shadow-cardHover">
                  <div className="font-semibold text-chotam-ink">{d.name}</div>
                  <div className="text-xs text-chotam-muted mt-0.5">{xLabel}: <strong>{d[xKey]}</strong> · {yLabel}: <strong>{d[yKey]}</strong></div>
                </div>
              );
            }}
          />
          <Scatter data={cohortCorrelation} fill={color} fillOpacity={0.85} />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
}

function CohortTab() {
  return (
    <div className="space-y-5">
      <Card title="הישגים במחזור · השוואה בין בתי הספר" subtitle="כל בתי הספר במחזור הליווי. הקו האדום: ממוצע ארצי.">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={cohortCorrelation} margin={{ top: 16, right: 8, bottom: 32, left: 8 }}>
            <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#dcdce5" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} interval={0} angle={-25} textAnchor="end" height={70} />
            <YAxis tick={{ fontSize: 11, fill: '#6b6b80', fontFamily: 'Rubik' }} domain={[0, 80]} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Rubik' }} />
            <ReferenceLine y={cohortAverages.national.language} stroke="#e63946" strokeDasharray="4 4" label={{ value: 'ממוצע ארצי שפה', fill: '#e63946', fontSize: 10, position: 'insideTopRight' }} />
            <Bar dataKey="language" name="שפת אם" fill="#0046ff" radius={[6, 6, 0, 0]} />
            <Bar dataKey="math" name="מתמטיקה" fill="#0fb4f5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-3 gap-5">
        <Card title="ממוצע במחזור · שפת אם" tone="default">
          <div className="text-5xl font-bold text-chotam-blue tracking-tight">{cohortAverages.language}</div>
          <div className="text-sm text-chotam-muted mt-2">ממוצע ארצי: <strong className="text-chotam-ink">{cohortAverages.national.language}</strong></div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-chotam-warm font-medium">
            <Activity className="w-3 h-3" />
            המחזור 2 נקודות מתחת לממוצע ארצי, פער מצטמצם
          </div>
        </Card>

        <Card title="ממוצע במחזור · מתמטיקה" tone="default">
          <div className="text-5xl font-bold text-chotam-cyan tracking-tight">{cohortAverages.math}</div>
          <div className="text-sm text-chotam-muted mt-2">ממוצע ארצי: <strong className="text-chotam-ink">{cohortAverages.national.math}</strong></div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-chotam-warm font-medium">
            <Activity className="w-3 h-3" />
            פער של 2 נקודות, מצטמצם כל שנה
          </div>
        </Card>

        <Card title="בתי ספר מעל הסף הארצי" subtitle="לפחות אחד משני המקצועות">
          <div className="text-5xl font-bold text-chotam-turquoise tracking-tight">{cohortCorrelation.filter(c => c.language >= cohortAverages.national.language || c.math >= cohortAverages.national.math).length}/{cohortCorrelation.length}</div>
          <div className="text-sm text-chotam-muted mt-2">מתוך בתי הספר במחזור</div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-chotam-turquoise font-medium">
            <ArrowUpRight className="w-3 h-3" />
            מגמת שיפור עקבית
          </div>
        </Card>
      </div>
    </div>
  );
}

function MiniBar({ value, color = 'bg-chotam-blue', max = 100 }) {
  return (
    <span className="inline-block w-20 h-2 bg-chotam-line rounded-full overflow-hidden align-middle">
      <span className={`block h-full ${color} transition-all`} style={{ width: `${(value / max) * 100}%` }} />
    </span>
  );
}
