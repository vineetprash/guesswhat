/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./*.{html}",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./src/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
