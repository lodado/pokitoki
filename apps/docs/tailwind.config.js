const postcss = require('tailwind-config/tailwind.config')

const content = ['./src/**/*.{ts,tsx,js,tsx}', '../../packages/designsystem/**/*.{js,ts,jsx,tsx}']

module.exports = {
  ...postcss,
  purge: {
    enabled: false,
  },
  content,
}
