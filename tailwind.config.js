/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Signature violet (Growim-aligned base #5B3AEE)
        brand: {
          DEFAULT: "#5B3AEE",
          50: "#EFEBFE",
          100: "#E1DAFC",
          200: "#C7BAF9",
          300: "#A48FF4",
          400: "#8163F0",
          500: "#5B3AEE",
          600: "#4B27E2",
          700: "#3D1FC0",
          800: "#331A9E",
          900: "#241270",
        },
        // Electric blue accent (#219BE4)
        azure: {
          DEFAULT: "#219BE4",
          300: "#7CCBF2",
          400: "#47B0EA",
          500: "#219BE4",
          600: "#1A82C4",
          700: "#14669B",
        },
        // Creative spark (used sparingly in gradients / highlights)
        coral: "#FF6A5A",
        pink: "#FF5DA2",
        // Deep near-black violet — dark panels + display text
        ink: {
          DEFAULT: "#17012C",
          soft: "#2A0A45",
          muted: "#504E4E",
          faint: "#89868D",
        },
        cloud: "#F7FAFE",
        mist: "#ECF8FF",
        line: "#EAF3F8",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.2em" },
      boxShadow: {
        card: "0 1px 2px rgba(23,1,44,0.05), 0 18px 40px -20px rgba(91,58,238,0.24)",
        lift: "0 30px 60px -24px rgba(91,58,238,0.38)",
        glow: "0 20px 50px -12px rgba(91,58,238,0.5)",
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
