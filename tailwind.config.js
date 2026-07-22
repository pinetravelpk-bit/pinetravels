/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: "#005902",
          50: "#eef6ee",
          100: "#d6ecd7",
          200: "#a9d6ab",
          300: "#71ba75",
          400: "#3d9a45",
          500: "#0f7a1c",
          600: "#005902",
          700: "#01430a",
          800: "#022f0b",
          900: "#031f0a",
        },
        maroon: {
          DEFAULT: "#7D0000",
          400: "#b5312f",
          500: "#9a1414",
          600: "#7D0000",
          700: "#5f0000",
          800: "#460000",
        },
        cream: "#F7F4EC",
        sand: "#EDE6D5",
        mist: "#E6EFE4",
        ink: {
          DEFAULT: "#16130F",
          soft: "#4C473F",
          faint: "#7A746A",
        },
      },
      fontFamily: {
        display: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.22em" },
      boxShadow: {
        card: "0 1px 2px rgba(3,31,10,0.06), 0 12px 30px -12px rgba(3,31,10,0.18)",
        lift: "0 20px 44px -18px rgba(3,31,10,0.35)",
      },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: { floaty: "floaty 7s ease-in-out infinite" },
    },
  },
  plugins: [],
};
