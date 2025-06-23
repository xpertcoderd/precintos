/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#f5f6f7',
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        stone: colors.warmGray,
        sky: colors.lightBlue,
        neutral: colors.trueGray,
        gray: colors.coolGray,
        slate: colors.blueGray,
        lime: colors.lime,
        rose: colors.rose,
      },
      boxShadow: {
        'custom-left': '-2px 0px 5px 2px rgba(52, 52, 52, 0.4)',
        'custom-right': '2px 0px 5px 2px rgba(52, 52, 52, 0.4)',
      },
    },
  },
  plugins: [],
}
