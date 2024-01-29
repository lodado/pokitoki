const postcss = require('tailwind-config/tailwind.config')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...postcss,
  content: ['./src/**/*.{ts,tsx,js,tsx}'],
}
