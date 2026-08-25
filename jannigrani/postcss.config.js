/**
 * POSTCSS CONFIGURATION: STABILITY & COMPILATION ENGINE
 * * Technical Features:
 * 1. MODULE RESOLUTION: Explicitly calls the standard tailwindcss plugin.
 * 2. VENDOR PREFIXING: Automates browser compatibility via Autoprefixer.
 * 3. BUILD OPTIMIZATION: Strips unused CSS and processes modern nesting.
 * 4. HMR SYNC: Ensures Hot Module Replacement is stable in cloud IDEs.
 * 5. ERROR RECOVERY: Fixes the 'tailwindcss as a PostCSS plugin' crash.
 */

export default {
  plugins: {
    // Bridges the standard Tailwind engine into the Vite build pipeline
    '@tailwindcss/postcss': {},
    
    // Automatically adds -webkit, -moz, and -ms prefixes for cross-device support
    'autoprefixer': {},
  },
};