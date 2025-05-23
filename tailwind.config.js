// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "win-blue": "#0078D7",
        "win-gray-light": "#f2f2f2",
        "win-gray": "#cccccc",
        "win-gray-medium": "#999999",
        "win-gray-dark": "#666666",
        "win-black": "#000000",
        "win-white": "#ffffff",
        // Add more specific system grays as needed
      },
      fontFamily: {
        "segoe-ui": ['"Segoe UI"', "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
      spacing: {
        // For pixel-perfect grid/spacing if needed
        0.25: "1px",
        0.75: "3px",
      },
      boxShadow: {
        "win-window": "0 0 0 1px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.1)",
        "win-taskbar": "0 -1px 2px rgba(0,0,0,0.1)",
        "win-button-active": "inset 0 1px 3px rgba(0,0,0,0.3)",
      },
      keyframes: {
        // For CSS animations
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        welcomeEllipsis: {
          "0%, 20%": { content: '"."' },
          "40%, 60%": { content: '".."' },
          "80%, 100%": { content: '"..."' },
        },
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        spinner: "spinner 1s linear infinite",
        "welcome-ellipsis": "welcomeEllipsis 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
