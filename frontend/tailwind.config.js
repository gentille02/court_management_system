/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        client: '#14b8a6',
        judge: '#a855f7',
        admin: '#ef4444'
      }
    },
  },
  plugins: [],
}
