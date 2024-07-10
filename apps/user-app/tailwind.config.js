/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      borderWidth: {
        '0': '0',
        '2': '2px',
        '3': '3px'
      },
      backgroundColor: {
        'mingrey': '#424242'
      }
    }
  },
  plugins: [],
}