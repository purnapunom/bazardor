module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      bazar: {
        primary: "#15803d", "primary-content": "#ffffff",
        secondary: "#b45309", accent: "#f59e0b",
        neutral: "#1f2937", "base-100": "#ffffff", "base-200": "#f3f7f1", "base-300": "#dfe8da",
        info: "#0284c7", success: "#16a34a", warning: "#f59e0b", error: "#dc2626",
      },
    }],
  },
};
