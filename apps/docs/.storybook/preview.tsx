import type { Preview } from '@storybook/react'
import './index.css'
import 'tailwind-config/index.css'

import React from 'react'

const preview: Preview = {
  decorators: [(Story) => <>{Story()}</>],

  parameters: {
    docs: {
      toc: true, // 👈 Enables the table of contents
    },

    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
