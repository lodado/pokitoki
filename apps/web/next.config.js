/* eslint-disable turbo/no-undeclared-env-vars */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin')
const Sentry = require('@sentry/nextjs')

const withNextIntl = createNextIntlPlugin()
const { withSentryConfig } = Sentry

function parseURL(rawUrl) {
  const url = new URL(process.env.NODE_ENV !== 'test' ? rawUrl : 'https://www.mock.com/')

  if (!url) throw new Error('No URL specified in next.config.images.remotePatterns')

  return {
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port,
  }
}

const nextConfig = {
  /*
  i18n: {
    locales: ['en-US', 'ko'],
    defaultLocale: 'ko',
  }, */

  images: {
    remotePatterns: [parseURL(process.env.NEXT_PUBLIC_SUPABASE_URL)],

    // loader: 'custom',
    // loaderFile: './src/lib/supabase/supabaseLoader.ts',
  },

  reactStrictMode: false,

  sentry: {
    transpileClientSDK: true,
  },
  transpilePackages: ['shared'],
}
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  tracingOptions: {
    // 하위 구성 요소를 추적하고 렌더링 프로세스에 대한 자세한 내용을 보기
    trackComponents: true,
  },
  org: 'chungheon-yi',
  project: 'javascript-nextjs',

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  hideSourceMap: true,
  silent: false, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withNextIntl(withSentryConfig(nextConfig, sentryWebpackPluginOptions))
