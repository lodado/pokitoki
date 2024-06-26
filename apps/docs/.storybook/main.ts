import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  async webpackFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      // Modify config for development
    }
    if (configType === 'PRODUCTION') {
      // Modify config for production
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          child_process: false,
          process: false,
          fs: false,
          util: false,
          http: false,
          https: false,
          tls: false,
          net: false,
          crypto: false,
          path: false,
          os: false,
          stream: false,
          zlib: false,
        },

        alias: {
          ...config.resolve?.alias,

          '@': path.resolve(__dirname, '../../web/src'),
          'next/router': require.resolve('./__mocks__/next/router.tsx'),
          'next/link': require.resolve('./__mocks__/next/link.tsx'),
          'next/image': require.resolve('./__mocks__/next/image.tsx'),
        },
      },
    }
  },
}

export default config
