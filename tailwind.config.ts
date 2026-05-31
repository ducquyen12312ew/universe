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
        overleaf: {
          green: "#4caf50",
          "green-dark": "#45a049",
          bg: "#1b2638",
          sidebar: "#1a2535",
          surface: "#243044",
          border: "#2d3d56",
          text: "#c5cdd9",
          "text-muted": "#7a8a9e",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-out",
        "slide-down": "slideDown 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
