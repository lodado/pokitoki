import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import PokiTokiNavigation from '@/components/Navigator/PokiTokiNavigation'
import { getLoginSession } from '@/hooks/login'
import { LayoutProps } from '@/interface/type'
import LibraryClientProvider from '@/lib/LibraryClientProvider'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  const session = await getLoginSession()

  return (
    <LibraryClientProvider session={session}>
      <div
        className="absolute border-b h-12 w-full border-b-1 border-solid border-border-01"
        role="presentation none"
      />

      <ResponsiveLayout className="min-h-screen">{children}</ResponsiveLayout>
    </LibraryClientProvider>
  )
}

export default Layout
