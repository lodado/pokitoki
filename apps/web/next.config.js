/* eslint-disable turbo/no-undeclared-env-vars */

const createNextIntlPlugin = require('next-intl/plugin')

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const Sentry = require('@sentry/nextjs')

const withNextIntl = createNextIntlPlugin()
const { withSentryConfig } = Sentry

const nextConfig = {
  /*
  i18n: {
    locales: ['en-US', 'ko'],
    defaultLocale: 'ko',
  }, */

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

module.exports = withBundleAnalyzer(withNextIntl(withSentryConfig(nextConfig, sentryWebpackPluginOptions)))
