import type { Config } from "tailwindcss";

// Tokens mirror DESIGN.md (front matter). DESIGN.md is the source of truth.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        paper: "#EDE9E0",
        concrete: "#DBD6CA",
        steel: "#57544C",
        hazard: "#FF4D00",
        signal: "#1453FF",
        volt: "#C8FF00",
        "paper-dim": "#9B978C",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 9vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "body-lg": ["clamp(1.05rem, 1.5vw, 1.35rem)", { lineHeight: "1.55" }],
      },
      boxShadow: {
        hard: "6px 6px 0 0 #0B0B0C",
        "hard-sm": "4px 4px 0 0 #0B0B0C",
        "hard-paper": "6px 6px 0 0 #EDE9E0",
        "hard-hazard": "6px 6px 0 0 #FF4D00",
        "hard-signal": "6px 6px 0 0 #1453FF",
      },
      letterSpacing: {
        label: "0.18em",
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        full: "9999px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        blink: "blink 1.4s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
