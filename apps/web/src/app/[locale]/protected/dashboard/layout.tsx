import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import PokiTokiNavigation from '@/components/Navigator/PokiTokiNavigation'
import { LayoutProps } from '@/interface/type'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return (
    <PokiTokiNavigation>
      <div className="w-full h-full min-h-[calc(100vh-3rem)] pt-4 px-6 bg-background-02">{children} </div>
    </PokiTokiNavigation>
  )
}

export default Layout
