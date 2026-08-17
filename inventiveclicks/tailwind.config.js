/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Near-black ink base
        ink: {
          DEFAULT: "#0A0B0D",
          900: "#08090B",
          800: "#0D0F12",
          700: "#131519",
          600: "#191c21",
          500: "#22262c",
        },
        // Electric lime — the "grow / clicks" brand accent
        brand: {
          DEFAULT: "#C8F94E",
          300: "#E2FC97",
          400: "#D6FB6E",
          500: "#C8F94E",
          600: "#AEE82F",
          700: "#8CC61C",
        },
        cream: "#F5F6EF",
        muted: "#9AA1AB",
        faint: "#6A7079",
        line: "rgba(255,255,255,0.09)",
        violet: "#A78BFA",
        cyan: "#5EEAD4",
      },
      fontFamily: {
        display: ['"Syne Variable"', "Syne", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Manrope Variable"', "Manrope", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "10xl": ["9.5rem", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(200,249,78,0.35), 0 18px 60px -12px rgba(200,249,78,0.35)",
        soft: "0 24px 60px -24px rgba(0,0,0,0.7)",
        card: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.8)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "gradient-move": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "80%,100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration,32s) linear infinite",
        "marquee-rev": "marquee-rev var(--marquee-duration,32s) linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "gradient-move": "gradient-move 8s ease infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
      },
    },
  },
  plugins: [],
};
