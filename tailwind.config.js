const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivo': ['archivo', ...defaultTheme.fontFamily.sans],
        'nhl': ['nhl', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
