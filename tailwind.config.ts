import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#094771",
          container: "#2c5f8a",
          light: "#cfe5ff",
        },
        secondary: {
          DEFAULT: "#056c50",
          container: "#9ff4d0",
        },
        surface: {
          DEFAULT: "#f9f9ff",
          low: "#f0f3ff",
          container: "#e7eeff",
          high: "#dfe8fd",
        },
        "on-surface": {
          DEFAULT: "#131c2a",
          muted: "#42474e",
        },
        outline: {
          DEFAULT: "#72777f",
          light: "#c2c7cf",
        },
        error: {
          DEFAULT: "#ba1a1a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
