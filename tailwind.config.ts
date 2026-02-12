import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#0f1419",
          elevated: "#1a2129",
          overlay: "#252d38",
        },
        border: "#2d3843",
        brand: {
          DEFAULT: "#5266eb", /* rgb(82, 102, 235) */
          hover: "#4155dc",
        },
        risk: {
          high: "#e5484d",
          medium: "#f5c542",
          low: "#46a758",
        },
      },
    },
  },
  plugins: [],
};

export default config;
