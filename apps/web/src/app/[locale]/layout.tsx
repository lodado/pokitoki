import type { Viewport } from 'next'
import { headers } from 'next/headers'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'

import { Splash } from '@/components'
import GlobalAdapterServer from '@/components/GlobalAdapter/GlobalAdapter.server'
import PokiTokiNavigation from '@/components/Navigator/PokiTokiNavigation'
import { LayoutProps } from '@/interface/type'
import { LibraryProvider } from '@/lib'
import { GA } from '@/lib/GA'

import ScreenVhScript from './ScreenVhScript'

export function generateViewport(): Viewport {
  return {
    initialScale: 1.0,
    maximumScale: 1.0,
    minimumScale: 1.0,
    userScalable: false,
    viewportFit: 'cover',
    width: 'device-width',
  }
}

/**
 * TO DO - pwa 관련 옵션 수정
 */
const RootLayout: React.FunctionComponent<LayoutProps> = ({ children, params: { locale } }) => {
  const messages = useMessages()
  const nonce = headers().get('x-nonce')!

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />

        <meta name="application-name" content="pokitoki" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body style={{ display: 'flex', flexDirection: 'column' }}>
        <ScreenVhScript nonce={nonce} />
        <LibraryProvider>
          <GlobalAdapterServer />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Splash>{children}</Splash>
          </NextIntlClientProvider>
        </LibraryProvider>
        <GA nonce={nonce} />
      </body>
    </html>
  )
}

export default RootLayout
