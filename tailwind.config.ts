import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: "#B4E3C8",
        navy: "#00111B",
        green: "#05A049",
        cream: "#FFFFFC",
        "navy-light": "#0A2236",
        "navy-mid": "#0D2D45",
      },
      fontFamily: {
        title: ["var(--font-title)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
