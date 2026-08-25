/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        citizenNavy: '#0B243B',
        nigraniBlue: '#174A7E',
      },
      borderRadius: {
        'extreme-pill': '100rem',
      },
      boxShadow: {
        'floating-card': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Merriweather"', 'serif'],
      }
    },
  },
  plugins: [],
}