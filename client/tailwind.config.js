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
        primaryHover: "hsl(var(--primery-hover))",
        secondary: "hsl(var(--secondary))",
        secondaryHover: "hsl(var(--secondary-hover))",
        darkBlueRanking: "hsl(var(--dark-blue-ranking))",
        lightBlueRanking: "hsl(var(--light-blue-ranking))",
        textBlack: "hsl(var(--text-black))",
        detailsBackground: "hsl(var(--details-background))",
        textGray: "hsl(var(--text-gray))",
      },
      fontFamily: {
				dmSans: ['DM Sans', 'sans-serif']
			},
    },
  },
  plugins: [require("tailwindcss-animate")],
}