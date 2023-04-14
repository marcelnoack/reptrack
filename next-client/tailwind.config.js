/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
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
      }
    },
  },
  plugins: [],
}

