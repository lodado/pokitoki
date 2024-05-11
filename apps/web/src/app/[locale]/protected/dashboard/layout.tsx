import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import PokiTokiNavigation from '@/components/Navigator/PokiTokiNavigation'
import { LayoutProps } from '@/interface/type'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return (
    <PokiTokiNavigation>
      <div className="w-full h-[calc(100vh-48px)] px-6 pt-4 bg-background-02">{children} </div>
    </PokiTokiNavigation>
  )
}

export default Layout
