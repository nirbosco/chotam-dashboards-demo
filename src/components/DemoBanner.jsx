import { ShieldAlert } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="bg-chotam-red text-white text-center text-[13px] py-2.5 px-4 sticky top-0 z-50 font-medium tracking-tight">
      <div className="max-w-[1480px] mx-auto flex items-center justify-center gap-2.5">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <span>
          <strong className="font-bold">להדגמה בלבד.</strong>
          {' '}
          זוהי גרסת דמו אנונימית של מערכת המידע הפעילה של חותם לליווי רשויות ובתי ספר. השמות, המספרים והנתונים הוחלפו או טושטשו לצורך שמירה על פרטיות בתי הספר, המנהלים והתלמידים. המערכת הפעילה מציגה נתונים אמיתיים תחת בקרות הרשאה והגנת מידע מלאות.
        </span>
      </div>
    </div>
  );
}
