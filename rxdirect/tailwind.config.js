/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0b1f33", soft: "#475569" },
        brand: { 50: "#ecfdf7", 100: "#d1fae9", 500: "#10b981", 600: "#059669", 700: "#047857" },
        navy: { 700: "#123456", 800: "#0e2a47", 900: "#0b1f33" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
