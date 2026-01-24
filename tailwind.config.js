/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          text: '#0F172A',
          textMuted: '#475569',
          border: '#E2E8F0',
          primary: '#1E3A8A',
          accent: '#0F766E',
        },
        dark: {
          bg: '#0B1220',
          surface: '#0F172A',
          text: '#E5E7EB',
          textMuted: '#94A3B8',
          border: '#1F2937',
          primary: '#60A5FA',
          accent: '#2DD4BF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
