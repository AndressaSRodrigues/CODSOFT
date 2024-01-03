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
        'blue': '#99CCCC', // Technology
        'green': '#99cc99', // Environment
        'red': '#CC9999', // Cinema and TV
        'purple': '#CC99CC', // Literature
        'babyblue': '#9999CC', // Culture and Geography
        'orange': '#FFCC99', // General Knowledge
      }
    },
  },
  plugins: [],
}

