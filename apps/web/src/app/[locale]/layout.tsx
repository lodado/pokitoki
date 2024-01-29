import { NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'

import { LayoutProps } from '@/interface/type'
import { LibraryProvider } from '@/lib'
import { GA } from '@/lib/GA'

const RootLayout: React.FunctionComponent<LayoutProps> = ({ children, params: { locale } }) => {
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LibraryProvider>{children}</LibraryProvider>
          <GA />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
