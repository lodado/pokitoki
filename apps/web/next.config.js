/* eslint-disable turbo/no-undeclared-env-vars */

/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
})

const Sentry = require('@sentry/nextjs')

const withNextIntl = createNextIntlPlugin()
const { withSentryConfig } = Sentry

const CSP = `
default-src 'none';
font-src 'self' cdnjs.cloudflare.com spoqa.github.io cdn.jsdelivr.net;
script-src 'self' 'unsafe-eval';
script-src-elem 'self';
connect-src 'self' cdnjs.cloudflare.com;
style-src 'self' 'unsafe-inline';
style-src-elem 'self' 'unsafe-inline' cdnjs.cloudflare.com;
img-src 'self';
manifest-src 'self';
base-uri 'self';
form-action 'self';
frame-src 'self';
frame-ancestors 'none';
object-src 'none'; 
`

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

    /** vercel에 과금해야해서 supabase image loader 사용 */
    loader: 'custom',
    loaderFile: './src/lib/supabase/supabaseLoader.ts',

    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [550, 768],
  },

  reactStrictMode: false,

  sentry: {
    hideSourceMaps: true,
    transpileClientSDK: true,
  },
  transpilePackages: ['@custompackages/design-assets'],

  async headers() {
    return [
      {
        source: '/(.*)',

        // nginx 쓰면 기본적으로 제공해주긴 함
        headers: [
          /*
            This header helps prevent cross-site scripting (XSS),
            clickjacking and other code injection attacks.
            Content Security Policy (CSP) can specify allowed origins for content including scripts, stylesheets,
            images, fonts, objects, media (audio, video), iframes, and more
          */
          /*
            {
            key: 'Content-Security-Policy',
            value: CSP.replace(/\n/g, '')
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          */

          /*
             it provide protection for older web browsers that don't support CSP.
          */
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          /*
            This header indicates whether
            the site should be allowed to be displayed within an iframe.
            This header has been superseded by CSP's
            frame-ancestors option, which has better support in modern browsers
          */
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          /*
            This is an extended header proposed by Microsoft,
            which restricts the interpretation to beyond the MIME types
            sent by the web server as a defense against cross-site scripting.
          */
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          /*
            refererer 정책
            When using HTTPS, the full address is retained if the websites are the same,
            and only the domain address is retained if they are different.
            For websites using HTTP, the address is not retained.
          */
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
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

  silent: false, // Suppresses all logs
}

module.exports = withPWA(withBundleAnalyzer(withNextIntl(withSentryConfig(nextConfig, sentryWebpackPluginOptions))))
