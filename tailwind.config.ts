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
        // Brand
        navy:        "#00111B",
        "navy-light":"#0A2236",
        "navy-mid":  "#0D2D45",
        green:       "#05A049",
        "green-dark":"#03803A",
        mint:        "#B4E3C8",
        cream:       "#FFFFFC",
        // Light theme surfaces
        canvas:      "#F5F7FA",
        surface:     "#FFFFFF",
        "surface-2": "#F0F4F8",
        // Light theme text
        ink:         "#0F172A",
        "ink-2":     "#475569",
        "ink-3":     "#94A3B8",
        // Light theme borders
        line:        "#E2E8F0",
        "line-2":    "#CBD5E1",
      },
      fontFamily: {
        title:   ["var(--font-title)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
