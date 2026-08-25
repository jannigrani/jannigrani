/** @type {import('tailwindcss').Config} */
export default {
  // Ensures every generated page in the src directory is scanned for the latest UI classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Set to 'class' to support our manual theme switcher and system preference sync
  darkMode: 'class',

  theme: {
    extend: {
      // Enforces color mapping along with enterprise accent colors
      colors: {
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          grey: '#F2F4F7',
          stark: '#111111',
          accent: '#00A9F7',
        },
        citizenNavy: '#0B243B',
        nigraniBlue: '#174A7E',
        actionBlue: '#00A9F7',
      },

      // Typography Scale optimized for Inter and serif fonts
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 8vw, 5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.05em', fontWeight: '900' }],
        'heading': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        'subheading': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
      },

      // Custom keyframes for hardware-accelerated transitions
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse-slow': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 15s linear infinite',
        'spin-reverse-slow': 'spin-reverse-slow 20s linear infinite',
      },

      // Premium rounded corners for containers and input fields
      borderRadius: {
        'uber': '14px',
        'super': '32px',
        'mega': '48px',
        'extreme-pill': '100rem',
      },

      boxShadow: {
        'floating-card': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },

      // Extended spacing supporting massive layout padding
      spacing: {
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
      }
    },
  },

  plugins: [],
}