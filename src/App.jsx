import { useState } from 'react';
import { TopNav } from './components/TopNav.jsx';
import { DemoBanner } from './components/DemoBanner.jsx';
import { AuthorityDashboard } from './pages/AuthorityDashboard.jsx';
import { PrincipalDashboard } from './pages/PrincipalDashboard.jsx';
import { MeasurementDashboard } from './pages/MeasurementDashboard.jsx';
import { PlaceholderPage } from './pages/PlaceholderPage.jsx';

const BREADCRUMBS = {
  authority: 'רשות לדוגמה · מבט מערכתי',
  school: 'בית ספר לדוגמה · מבט מנהלת',
  measurement: 'מדידה והערכה · שפה, מתמטיקה ומדדי חותם',
  agent: 'סוכן חכם',
  admin: 'ניהול מערכת',
  institutions: 'ניהול מוסדות',
  links: 'לינקים',
  knowledge: 'מרכז הידע',
  partners: 'מלוות ומלווי בתי ספר'
};

export default function App() {
  const [view, setView] = useState('authority');

  return (
    <div dir="rtl" className="min-h-screen bg-chotam-white text-chotam-ink font-rubik">
      <DemoBanner />
      <TopNav view={view} onChange={setView} breadcrumb={BREADCRUMBS[view] || ''} />
      {view === 'authority' && (
        <AuthorityDashboard onOpenSchool={() => setView('school')} />
      )}
      {view === 'school' && (
        <PrincipalDashboard onBackToAuthority={() => setView('authority')} />
      )}
      {view === 'measurement' && (
        <MeasurementDashboard />
      )}
      {!['authority', 'school', 'measurement'].includes(view) && (
        <PlaceholderPage view={view} />
      )}
    </div>
  );
}
