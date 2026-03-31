/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightBg: '#F8F7F4',
        lightText: '#0F0F0F',
        lightAccent: '#4F46E5',
        lightSecondary: '#7C3AED',
        lightCard: '#FFFFFF',
        darkBg: '#0D0D0D',
        darkText: '#F1F1F1',
        darkAccent: '#818CF8',
        darkSecondary: '#A78BFA',
        darkCard: '#161616',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
      },
    },
  },
  plugins: [],
}
