/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Signature violet
        brand: {
          DEFAULT: "#7C4DFF",
          50: "#F4F1FF",
          100: "#EBE5FF",
          200: "#D7CBFF",
          300: "#BBA5FF",
          400: "#9B78FF",
          500: "#7C4DFF",
          600: "#6A32F0",
          700: "#5A25D6",
          800: "#4A1FAD",
          900: "#331674",
        },
        // Electric blue accent
        azure: {
          DEFAULT: "#1BA5EC",
          300: "#7FD8FB",
          400: "#38C6F4",
          500: "#1BA5EC",
          600: "#1587CC",
          700: "#146AA3",
        },
        // Creative spark (used sparingly in gradients / highlights)
        coral: "#FF6A5A",
        pink: "#FF5DA2",
        // Deep near-black violet — dark panels + display text
        ink: {
          DEFAULT: "#0D0821",
          soft: "#171233",
          muted: "#56526B",
          faint: "#8B8799",
        },
        cloud: "#F6F5FB",
        mist: "#EEEBF9",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.2em" },
      boxShadow: {
        card: "0 1px 2px rgba(13,8,33,0.05), 0 18px 40px -20px rgba(74,31,173,0.28)",
        lift: "0 30px 60px -24px rgba(74,31,173,0.42)",
        glow: "0 20px 50px -12px rgba(124,77,255,0.55)",
      },
      borderRadius: { xl2: "1.5rem", xl3: "2rem" },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(3%,-4%) scale(1.06)" },
          "66%": { transform: "translate(-3%,3%) scale(0.96)" },
        },
        spinslow: { to: { transform: "rotate(360deg)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        spinslow: "spinslow 26s linear infinite",
      },
    },
  },
  plugins: [],
};
