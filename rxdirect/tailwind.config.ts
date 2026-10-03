import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue palette from the 2026 redesign. Every page uses brand-*, so
        // this one block recolours the whole site.
        brand: {
          50: "#eff5ff",
          100: "#dbe7ff",
          200: "#bfd3ff",
          300: "#93b4fd",
          400: "#6090fa",
          500: "#2f66ee",
          600: "#1d4ed8",
          700: "#1a40b5",
          800: "#1b3a8f",
          900: "#0b1f4d",
        },
        navy: {
          DEFAULT: "#0b1f4d",
          800: "#10285f",
          900: "#081638",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        urdu: ["var(--font-urdu)"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
