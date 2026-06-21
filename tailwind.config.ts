import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        surfaceLight: "var(--color-surface-light)",
        surfaceLighter: "var(--color-surface-lighter)",
        border: "var(--color-border)",
        borderLight: "var(--color-border-light)",
        foreground: "var(--color-foreground)",
        foregroundSecondary: "var(--color-foreground-secondary)",
        muted: "var(--color-muted)",
        faint: "var(--color-faint)",
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        sky: {
          300: "#7dd3fc",
          400: "#38bdf8",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "hero-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "hero-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "hero-md": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "section-xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "section-lg": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      spacing: {
        section: "8rem",
        "section-sm": "5rem",
      },
      maxWidth: {
        content: "72rem",
        "content-narrow": "56rem",
      },
      borderRadius: {
        card: "12px",
        "card-lg": "16px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "glow-indigo": "var(--shadow-glow)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;