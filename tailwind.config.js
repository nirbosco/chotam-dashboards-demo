/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'Heebo', 'system-ui', 'sans-serif']
      },
      colors: {
        chotam: {
          // Primary brand
          blue: '#0046ff',       // כחול חותם החדש
          blueDark: '#0033cc',
          blueDeep: '#001f80',
          // Secondary
          turquoise: '#23d7cd',  // טורקיז חותם
          cyan: '#0fb4f5',       // תכלת חותם
          sky: '#2882f0',        // תכלת אדוות
          royal: '#3c5af0',      // תכלת כהה חותם
          violet: '#6437eb',     // סגול חותם
          // Neutrals
          white: '#f0f0f5',      // לבן חותם
          paper: '#f5f5f8',
          card: '#ffffff',
          ink: '#0a0a1a',
          slate: '#3a3a4d',
          muted: '#6b6b80',
          line: '#dcdce5',
          // Status
          warm: '#ff6b3d',
          gold: '#ffb830',
          red: '#e63946',
          green: '#23d7cd'
        }
      },
      borderRadius: {
        chotam: '20px',
        chotamSm: '12px'
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 31, 128, 0.05), 0 1px 2px rgba(0, 31, 128, 0.03)',
        cardHover: '0 4px 16px rgba(0, 70, 255, 0.08)'
      }
    }
  },
  plugins: []
};
