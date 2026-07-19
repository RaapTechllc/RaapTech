import type { Config } from "tailwindcss";

// Tokens mirror DESIGN.md (front matter). DESIGN.md is the source of truth.
// Brand palette is strict black/white/gray — no accent colors without approval.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        gray: {
          1: "#333333", // secondary text
          2: "#666666", // captions
          3: "#CCCCCC", // borders, dividers
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 9vw, 8rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "body-lg": ["clamp(1.05rem, 1.5vw, 1.35rem)", { lineHeight: "1.55" }],
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
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
