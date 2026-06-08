// Chotam dashboards mock data
// Authority view (Shlomi) + School view (Ben Zvi)
// Language: classic school operations, not tender-specific terms

export const authority = {
  name: 'רשות לדוגמה',
  cohortName: 'מחזור ליווי חותם',
  cycleYear: 2,
  totalCycleYears: 4,
  totalStudents: 1479,
  amitName: 'תמר רוזן',
  lastSync: '28 במאי 2026, 09:14',
  nextAuthorityForum: '11 ביוני'
};

// Nine schools in the cycle (elementaries + secondaries)
export const schools = [
  {
    id: 'ben-zvi',
    symbol: '——',
    name: 'בית ספר לדוגמה א\'',
    type: 'יסודי',
    studentCount: 329,
    principal: 'ר. אדרי',
    cohortYear: 2,
    chotamAmit: 'תמר רוזן',
    nextMeeting: '02 ביוני',
    lastUpdate: 'היום',
    pulse: {
      attendance: 0.94,          // נוכחות
      retention: 0.97,           // התמדה (תלמידים שנשארו במסגרת)
      teamPresence: 0.92,        // נוכחות צוות
      parentEngagement: 0.71,    // מעורבות הורים פעילה
      climate: 4.1,              // אקלים בית ספרי / 5
      agency: 3.8,               // אייג'נסי תלמיד / 5
      teamResponsibility: 4.1,   // אחריות צוותית / 5
      routinesScore: 78          // קיום שגרות שבועיות %
    },
    trend: {
      climate: [3.4, 3.5, 3.7, 3.9, 4.0, 4.1],
      agency: [3.1, 3.2, 3.4, 3.6, 3.7, 3.8],
      teamResponsibility: [3.2, 3.4, 3.6, 3.9, 4.0, 4.1],
      attendance: [88, 90, 91, 92, 93, 94]
    }
  },
  {
    id: 'oren',
    symbol: '——',
    name: 'בית ספר ב\'',
    type: 'יסודי',
    studentCount: 286,
    principal: 'ר. דנה',
    cohortYear: 2,
    chotamAmit: 'תמר רוזן',
    nextMeeting: '03 ביוני',
    lastUpdate: 'אתמול',
    pulse: { attendance: 0.91, retention: 0.95, teamPresence: 0.89, parentEngagement: 0.64, climate: 3.8, agency: 3.6, teamResponsibility: 3.8, routinesScore: 71 }
  },
  {
    id: 'brosh',
    symbol: '——',
    name: 'בית ספר ג\'',
    type: 'יסודי',
    studentCount: 241,
    principal: 'ד. שורק',
    cohortYear: 2,
    chotamAmit: 'יעל מורן',
    nextMeeting: '04 ביוני',
    lastUpdate: 'לפני 3 ימים',
    pulse: { attendance: 0.87, retention: 0.92, teamPresence: 0.84, parentEngagement: 0.52, climate: 3.4, agency: 3.3, teamResponsibility: 3.4, routinesScore: 58 }
  },
  {
    id: 'rav-maimon',
    symbol: '——',
    name: 'בית ספר ד\'',
    type: 'יסודי',
    studentCount: 312,
    principal: 'ש. בן חמו',
    cohortYear: 2,
    chotamAmit: 'תמר רוזן',
    nextMeeting: '05 ביוני',
    lastUpdate: 'היום',
    pulse: { attendance: 0.95, retention: 0.98, teamPresence: 0.94, parentEngagement: 0.78, climate: 4.3, agency: 4.0, teamResponsibility: 4.3, routinesScore: 86 }
  },
  {
    id: 'shaked',
    symbol: '——',
    name: 'בית ספר ה\'',
    type: 'יסודי',
    studentCount: 274,
    principal: 'ה. בן שושן',
    cohortYear: 2,
    chotamAmit: 'יעל מורן',
    nextMeeting: '08 ביוני',
    lastUpdate: 'אתמול',
    pulse: { attendance: 0.92, retention: 0.94, teamPresence: 0.88, parentEngagement: 0.62, climate: 3.7, agency: 3.5, teamResponsibility: 3.7, routinesScore: 69 }
  },
  {
    id: 'hadas',
    symbol: '——',
    name: 'בית ספר ו\'',
    type: 'יסודי',
    studentCount: 198,
    principal: 'א. לוי',
    cohortYear: 2,
    chotamAmit: 'תמר רוזן',
    nextMeeting: '09 ביוני',
    lastUpdate: 'היום',
    pulse: { attendance: 0.93, retention: 0.96, teamPresence: 0.91, parentEngagement: 0.69, climate: 3.9, agency: 3.7, teamResponsibility: 3.9, routinesScore: 74 }
  },
  {
    id: 'salait',
    symbol: '——',
    name: 'בית ספר ז\'',
    type: 'יסודי',
    studentCount: 167,
    principal: 'א. נדלר',
    cohortYear: 2,
    chotamAmit: 'יעל מורן',
    nextMeeting: '10 ביוני',
    lastUpdate: 'לפני יומיים',
    pulse: { attendance: 0.93, retention: 0.95, teamPresence: 0.90, parentEngagement: 0.68, climate: 4.0, agency: 3.8, teamResponsibility: 4.0, routinesScore: 76 }
  },
  {
    id: 'tzeira',
    symbol: '——',
    name: 'חטיבה צעירה לדוגמה',
    type: 'חט"ב',
    studentCount: 178,
    principal: 'י. פרץ',
    cohortYear: 2,
    chotamAmit: 'תמר רוזן',
    nextMeeting: '06 ביוני',
    lastUpdate: 'אתמול',
    pulse: { attendance: 0.89, retention: 0.91, teamPresence: 0.86, parentEngagement: 0.55, climate: 3.6, agency: 3.5, teamResponsibility: 3.6, routinesScore: 64 }
  },
  {
    id: 'ort-h',
    symbol: '——',
    name: 'חט"ב לדוגמה',
    type: 'חט"ב',
    studentCount: 412,
    principal: 'ד. אביטן',
    cohortYear: 2,
    chotamAmit: 'יעל מורן',
    nextMeeting: '07 ביוני',
    lastUpdate: 'היום',
    pulse: { attendance: 0.90, retention: 0.93, teamPresence: 0.87, parentEngagement: 0.59, climate: 3.9, agency: 3.7, teamResponsibility: 3.9, routinesScore: 72 }
  }
];

// Leading team - classic school roles, no tender-specific positions
export const leadingTeam = [
  {
    id: 'ped',
    name: 'תמר אבירן',
    role: 'רכזת פדגוגית',
    accountabilityArea: 'מובילה את הצוות המוביל, אחראית על שגרות בית הספר',
    weeklyRoutineStatus: 'התקיימה',
    lastDecision: 'הוחלט לקבע ביום שני בלוח השעות שעת תכנון משותפת לרכזות שכבה',
    followUp: 'בוצע'
  },
  {
    id: 'social',
    name: 'אורית לוי',
    role: 'רכזת חברתית',
    accountabilityArea: 'אקלים בית ספרי, מעגלי שיח, אחריות הדדית',
    weeklyRoutineStatus: 'התקיימה',
    lastDecision: 'הפעלת מעגלי שיח שבועיים בכיתות ה\'-ו\' בהובלת המחנכות',
    followUp: 'בוצע'
  },
  {
    id: 'counselor',
    name: 'מיכל כהן',
    role: 'יועצת חינוכית',
    accountabilityArea: 'מענה רגשי לתלמידים, ליווי מורות, קשר עם הורים',
    weeklyRoutineStatus: 'התקיימה',
    lastDecision: 'בניית מסלול תמיכה לחמש תלמידות שזוהו עם סימני קושי רגשי',
    followUp: 'בתהליך'
  },
  {
    id: 'engagement',
    name: 'יוסי בן דוד',
    role: 'רכז מעורבות חברתית וקהילה',
    accountabilityArea: 'קשר עם הורים, פעילות קהילתית, התנדבות תלמידים',
    weeklyRoutineStatus: 'נדחתה',
    lastDecision: 'תכנון יום הורים-תלמידים בשבוע הבא, שיתוף פעולה עם המתנס',
    followUp: 'דורש מעקב'
  }
];

export const recentMeetings = [
  {
    date: '21 במאי 2026',
    attendees: ['ר. אדרי', 'תמר אבירן', 'תמר רוזן'],
    topic: 'דיון פתיחת רבעון: שגרות צוות מוביל',
    summary: 'בחנו את קצב קיום השגרות השבועיות לאורך הרבעון האחרון. הסכמה שצריך לחזק את הקשר בין רכזת חברתית לרכז המעורבות. הוחלט לאחד פגישה שבועית של השניים.',
    decisions: [
      'איחוד שגרה שבועית של רכזת חברתית ורכז מעורבות',
      'הוספת סעיף קבוע בישיבת צוות מוביל: סיפור הצלחה מהשבוע',
      'בחינה חוזרת בעוד חודש'
    ]
  },
  {
    date: '07 במאי 2026',
    attendees: ['ר. אדרי', 'תמר אבירן', 'מיכל כהן', 'תמר רוזן'],
    topic: 'תפיסת הצוות הלומד',
    summary: 'הוצגה לרכזת הפדגוגית תפיסת הצוות הלומד. הוסכם על שינוי במבנה ישיבות צוות שכבה: במקום הרצאות, ניתוח עבודות תלמידים במשותף.',
    decisions: [
      'מבנה חדש לישיבות צוות שכבה: 30 דקות ניתוח משותף',
      'תיעוד ישיבות בקובץ שיתופי',
      'דיווח חודשי על הטמעה בישיבת הצוות המוביל'
    ]
  },
  {
    date: '23 באפריל 2026',
    attendees: ['ר. אדרי', 'תמר רוזן'],
    topic: 'מסוגלות הצוות המוביל: שאלון תקופתי',
    summary: 'שאלון רבעוני הצביע על עלייה במדד אחריות צוותית מ-3.6 ל-3.9. עיקר השיפור במימד "אחריות הדדית". זוהו שני ממדים לחיזוק: "פתרון בעיות מורכבות" ו"אמון תחת אי-ודאות".',
    decisions: [
      'סדנת רפלקציה לצוות המוביל סביב שני הממדים',
      'הוספת שאלת מעקב בישיבה השבועית'
    ]
  }
];

export const alerts = [
  {
    type: 'attention',
    school: 'בית ספר ג\'',
    title: 'נוכחות צוות ירדה מתחת ל-85% שני שבועות ברצף',
    detail: 'שלוש מורות מצוות שכבת ד\'-ה\' נעדרו לסירוגין. רכזת פדגוגית מתאמת מענה.'
  },
  {
    type: 'attention',
    school: 'חטיבה צעירה לדוגמה',
    title: 'שגרת צוות מוביל לא התקיימה פעמיים ברצף',
    detail: 'מומלץ לתעדף בפגישת הליווי הקרובה עם המנהל.ת.'
  },
  {
    type: 'attention',
    school: 'בית ספר ג\'',
    title: 'מעורבות הורים ירדה משמעותית במחצית',
    detail: 'אחוז ההורים שמשתתפים בפורומים בית ספריים ירד מ-65% ל-52%.'
  }
];

export const successStories = [
  {
    school: 'בית ספר ד\'',
    title: 'נוכחות חצתה את ה-95% שלושה חודשים רצופים',
    detail: 'המנהל.ת מציינ.ת את הקשר לסדירות התכנון המשותף של הצוות המוביל וליוזמת "בוקר טוב לכיתה".'
  },
  {
    school: 'בית ספר לדוגמה א\'',
    title: 'מדד האחריות הצוותית חצה לראשונה את הסף',
    detail: 'שאלון Q2 הראה ציון 4.1 מתוך 5, מעל קבוצת ההתייחסות הארצית.'
  },
  {
    school: 'בית ספר ז\'',
    title: 'יוזמה של רכזת חברתית: מעגלי שיח בין כיתתיים',
    detail: 'התלמידות והתלמידים מובילים בעצמם, ויש סימני הדבקה לבית הספר הסמוך.'
  }
];

// Ben Zvi specific
export const todayPulse = {
  attendance: 0.94,
  staffOnReserve: 2,
  openIncidents: 1,
  nextChotamMeeting: {
    date: '02 ביוני, 10:00',
    topic: 'דיון רבעוני: שגרות צוות מוביל ומעורבות הורים',
    prepDoc: 'סיכום פגישה אחרונה + נתוני נוכחות 23.5'
  }
};

// Today's full week schedule for the school (calendar feel)
export const schoolWeek = [
  { day: 'א\'', date: '25.05', events: [{ time: '08:00', title: 'אסיפת בוקר שכבת ו\'', tone: 'blue' }, { time: '14:00', title: 'ישיבת צוות מוביל', tone: 'royal' }] },
  { day: 'ב\'', date: '26.05', events: [{ time: '10:00', title: 'תצפית כיתה ה\'2', tone: 'cyan' }, { time: '15:30', title: 'פגישה עם הורים', tone: 'turquoise' }] },
  { day: 'ג\'', date: '27.05', events: [{ time: '09:00', title: 'תכנון שכבתי ד\'', tone: 'blue' }] },
  { day: 'ד\'', date: '28.05', events: [{ time: '11:00', title: 'יום שיא חברתי-קהילתי', tone: 'violet' }] },
  { day: 'ה\'', date: '29.05', events: [{ time: '08:30', title: 'מועצת תלמידים', tone: 'royal' }, { time: '16:00', title: 'מפגש הורי שכבה ה\'', tone: 'turquoise' }] }
];

// Aggregated school dimensions for radar/dimension chart
export const schoolDimensions = [
  { dim: 'אייג\'נסי תלמיד', current: 3.8, baseline: 3.1, target: 4.4, fullMark: 5 },
  { dim: 'שייכות ואקלים', current: 4.1, baseline: 3.3, target: 4.6, fullMark: 5 },
  { dim: 'אחריות צוותית', current: 4.1, baseline: 3.2, target: 4.6, fullMark: 5 },
  { dim: 'מעורבות הורים', current: 3.6, baseline: 2.8, target: 4.3, fullMark: 5 },
  { dim: 'מנהיגות מבוזרת', current: 3.9, baseline: 3.0, target: 4.5, fullMark: 5 },
  { dim: 'יחסים וקשר אישי', current: 4.0, baseline: 3.3, target: 4.5, fullMark: 5 }
];

// Weekly attendance trend (last 6 weeks)
export const attendanceTrend = [
  { w: 'שב\' 17', val: 89 },
  { w: 'שב\' 18', val: 91 },
  { w: 'שב\' 19', val: 90 },
  { w: 'שב\' 20', val: 93 },
  { w: 'שב\' 21', val: 92 },
  { w: 'שב\' 22', val: 94 }
];

// Recent observations / מעקבים
export const observations = [
  {
    date: '23.05',
    location: 'כיתה ה\'2',
    teacher: 'רוית כהן',
    highlights: [
      { type: 'pos', text: 'תלמידים בחרו את שאלת הלמידה שלהם מתוך 4 אופציות. סימן לאייג\'נסי.' },
      { type: 'pos', text: '50% מזמן השיעור הוקדש לעבודת קבוצה.' },
      { type: 'attn', text: 'שלושה תלמידים בקצה התחתון לא התחברו לעבודה. נקודת מעקב.' }
    ]
  }
];

// Action items for principal
export const principalActions = [
  { text: 'אישור תכנית יום הורים-תלמידים', urgent: true, owner: 'יוסי בן דוד' },
  { text: 'מעבר על סיכום ישיבת צוות מוביל אחרונה', urgent: false },
  { text: 'תאום סמינר חינוך חברתי לקיץ', urgent: false },
  { text: 'דיווח רבעוני לוועדת היגוי רשותית', urgent: false }
];

// ============================================================
// MEASUREMENT & EVALUATION (מדידה והערכה)
// School-level academic data combined with Chotam metrics
// ============================================================

export const measurement = {
  schoolId: 'ben-zvi',
  asOf: 'Q2 · 2026',
  sources: ['תנופה', 'מיצ"ב פנימי', 'מבחני בית ספר'],
  current: {
    languageAvg: 67,         // ציון ממוצע שפת אם
    mathAvg: 61,             // ציון ממוצע מתמטיקה
    aboveBasic: 76,          // % תלמידים מעל סף בסיסי
    variance: 18             // שונות פנים-בית-ספרית (נקודות)
  },
  baseline: {
    languageAvg: 54,
    mathAvg: 49,
    aboveBasic: 58,
    variance: 27
  },
  target: {
    languageAvg: 75,
    mathAvg: 70,
    aboveBasic: 86,
    variance: 12
  }
};

// Per-grade breakdown
export const byGrade = [
  { grade: 'ג\'', students: 58, language: 71, math: 66, climate: 4.2, teamResp: 4.0 },
  { grade: 'ד\'', students: 62, language: 69, math: 63, climate: 4.1, teamResp: 4.1 },
  { grade: 'ה\'', students: 55, language: 64, math: 58, climate: 4.0, teamResp: 4.1 },
  { grade: 'ו\'', students: 60, language: 65, math: 60, climate: 4.0, teamResp: 4.2 }
];

// Distribution buckets
export const distribution = {
  language: [
    { bucket: 'מתחת לסף', current: 14, baseline: 28 },
    { bucket: 'בסיסי', current: 26, baseline: 31 },
    { bucket: 'מתקדם', current: 36, baseline: 27 },
    { bucket: 'מצוין', current: 24, baseline: 14 }
  ],
  math: [
    { bucket: 'מתחת לסף', current: 18, baseline: 32 },
    { bucket: 'בסיסי', current: 28, baseline: 30 },
    { bucket: 'מתקדם', current: 34, baseline: 25 },
    { bucket: 'מצוין', current: 20, baseline: 13 }
  ]
};

// Year-on-year trend (4 years of cycle)
export const yearTrend = [
  { year: '2023', language: 54, math: 49, teamResp: 3.2, climate: 3.4, milestone: 'תחילת המחזור' },
  { year: '2024', language: 58, math: 53, teamResp: 3.5, climate: 3.7, milestone: 'הקמת צוות מוביל' },
  { year: '2025', language: 63, math: 58, teamResp: 3.9, climate: 4.0, milestone: 'הטמעת שגרות שבועיות' },
  { year: '2026', language: 67, math: 61, teamResp: 4.1, climate: 4.1, milestone: 'קריאה משותפת של נתונים' }
];

// Correlation data: schools in cohort with their team metrics and achievement
// Deterministic offsets for reproducible visuals
const _ACH_OFFSETS = [1, -2, 1, 0, -1, 2, -1, 0, 1];
export const cohortCorrelation = schools.map((s, i) => ({
  name: s.name,
  teamResp: s.pulse.teamResponsibility,
  climate: s.pulse.climate,
  parentEng: Math.round(s.pulse.parentEngagement * 50) / 10, // normalize to 0-5 scale
  agency: s.pulse.agency,
  language: Math.round(45 + (s.pulse.teamResponsibility - 3) * 12) + _ACH_OFFSETS[i],
  math: Math.round(42 + (s.pulse.teamResponsibility - 3) * 11) + _ACH_OFFSETS[i],
  students: s.studentCount
}));

// Cohort comparison summary
export const cohortAverages = {
  language: 60,
  math: 56,
  national: { language: 62, math: 58 }
};
