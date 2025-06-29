import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F9F9F9", // Sky White
        foreground: "#222222", // Charcoal Black
        primary: {
          DEFAULT: "#2DBE60", // Fresh Green
          foreground: "#FFFFFF", // White text on green
        },
        secondary: {
          DEFAULT: "#F9F9F9", // Sky White
          foreground: "#222222", // Charcoal Black text
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F9F9F9", // Sky White
          foreground: "#666666", // Medium gray text
        },
        accent: {
          DEFAULT: "#A1E8AF", // Light Emerald
          foreground: "#222222", // Charcoal Black text
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#222222",
        },
        card: {
          DEFAULT: "#FFFFFF", // Pure white cards
          foreground: "#222222", // Charcoal Black text
        },
        // Clean Confidence color system
        "fresh-green": {
          DEFAULT: "#2DBE60",
          50: "#E8F5ED",
          100: "#D1EBDB",
          200: "#A3D7B7",
          300: "#75C393",
          400: "#47AF6F",
          500: "#2DBE60",
          600: "#24954D",
          700: "#1B6C3A",
          800: "#124327",
          900: "#091A14",
        },
        charcoal: {
          DEFAULT: "#222222",
          50: "#F5F5F5",
          100: "#EBEBEB",
          200: "#D7D7D7",
          300: "#C3C3C3",
          400: "#AFAFAF",
          500: "#9B9B9B",
          600: "#777777",
          700: "#555555",
          800: "#333333",
          900: "#222222",
        },
        "light-emerald": {
          DEFAULT: "#A1E8AF",
          50: "#F0FBF2",
          100: "#E1F7E5",
          200: "#C3EFCB",
          300: "#A5E7B1",
          400: "#87DF97",
          500: "#A1E8AF",
          600: "#6BC97F",
          700: "#4FB365",
          800: "#3A8A4B",
          900: "#256131",
        },
        "sky-white": "#F9F9F9",
        "warm-orange": {
          DEFAULT: "#FFA552",
          50: "#FFF4E8",
          100: "#FFE9D1",
          200: "#FFD3A3",
          300: "#FFBD75",
          400: "#FFA552",
          500: "#FF8F29",
          600: "#E6751A",
          700: "#B85B14",
          800: "#8A410E",
          900: "#5C2708",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
