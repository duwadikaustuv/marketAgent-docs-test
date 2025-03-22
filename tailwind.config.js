/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          950: "rgb(var(--primary-950) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "#00f3ff",
          dark: "#ff00ff",
        },
        code: {
          base: "#1e1e1e",
          highlight: "#2d2d2d",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        ripple: "ripple 0.5s ease-out forwards",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ['"Fira Code"', "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.5, 0.5, 0.3, 1.3)",
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              color: "var(--tw-prose-pre-code)",
              padding: "1rem",
              borderRadius: "0.5rem",
              overflowX: "auto",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            code: {
              color: "var(--tw-prose-code)",
              backgroundColor: "var(--tw-prose-pre-bg)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
              fontWeight: "600",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            pre: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              color: "var(--tw-prose-pre-code)",
            },
            code: {
              color: "var(--tw-prose-code)",
              backgroundColor: "var(--tw-prose-pre-bg)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
