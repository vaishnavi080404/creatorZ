// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Miller Text"', '"miller-text"', 'var(--font-source-serif)', 'Georgia', 'serif'],
        serif: ['"Miller Text"', '"miller-text"', 'var(--font-source-serif)', 'Georgia', 'serif'],
        heading: ['"Miller Text"', '"miller-text"', 'var(--font-source-serif)', 'Georgia', 'serif'],
      },
      colors: {
        primary: "#66101b",
        "primary-dark": "#4a0b13",
        "primary-hover": "#7d1623",
        secondary: "#faf3eb",
        "secondary-dark": "#eddcd0",
        "secondary-light": "#fdfaf7",
        accent: "#10B981",
        "accent-dark": "#0E7A6A",
        background: "#faf3eb",
        foreground: "#66101b",
        "primary-foreground": "#faf3eb",
        "secondary-foreground": "#66101b",
        "accent-foreground": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
