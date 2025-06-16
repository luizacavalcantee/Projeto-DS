/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        secondaryHover: "hsl(var(--secondary-hover))",
        darkBlueRanking: "hsl(var(--dark-blue-ranking))",
        lightBlueRanking: "hsl(var(--light-blue-ranking))",
      },
      fontFamily: {
				dmSans: ['DM Sans', 'sans-serif']
			},
    },
  },
  plugins: [require("tailwindcss-animate")],
}