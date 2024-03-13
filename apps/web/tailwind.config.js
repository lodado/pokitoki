const postcss = require('tailwind-config/tailwind.config')

module.exports = {
  ...postcss,
  content: ['./src/**/*.{ts,tsx,js,tsx}', '../../packages/designsystem/src/**/*.{ts,tsx,js,tsx}'],
}
