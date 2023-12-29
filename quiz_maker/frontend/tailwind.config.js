/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#CC0066',
        'blue': '#99CCCC', // Movies
        'green': '#99cc99', // TV Shows
        'red': '#CC9999', // Video Games
        'purple': '#CC99CC', // Books
        'babyblue': '#9999CC', // Anime
        'orange': '#FFCC99', // General Pop Culture
      }
    },
  },
  plugins: [],
}

