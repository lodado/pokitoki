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
      <ResponsiveLayout className="min-h-screen">
        <PokiTokiNavigation>{children}</PokiTokiNavigation>
      </ResponsiveLayout>
    </LibraryClientProvider>
  )
}

export default Layout
