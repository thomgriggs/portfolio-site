import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px", "2xl": "1320px" },
    },
    extend: {
      colors: {
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--fg))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-fg))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-fg))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-fg))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-fg))",
      },
      fontFamily: {
        display: ["Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Figma → Tailwind map (adjust these to your exact Figma specs)
        "display-1": ["clamp(2.5rem, 1.6rem + 2.6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2rem, 1.3rem + 2vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "title-1":   ["2rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "title-2":   ["1.5rem", { lineHeight: "1.2" }],
        "body-lg":   ["1.125rem", { lineHeight: "1.7" }],
      },
      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.06)",
        "card-hover": "0 12px 28px rgba(0,0,0,.12), 0 4px 12px rgba(0,0,0,.08)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
