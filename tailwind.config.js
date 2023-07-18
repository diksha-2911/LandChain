/** @type {import('tailwindcss').Config} */
export default {
  theme: {
      colors: {
        'red': "#0000"
      }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}