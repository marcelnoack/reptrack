/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [ 'Nunito', 'sans-serif' ],
    },
    extend: {
      colors: {
        info: '#1976d2',
        warning: '#ffbb33',
        error: '#ff4444'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

