import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import PokiTokiNavigation from '@/components/Navigator/PokiTokiNavigation'
import { LayoutProps } from '@/interface/type'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return (
    <PokiTokiNavigation>
      <div className="flex-1 h-[calc(100vh-5rem)] w-full px-6 pt-4 overflow-y-scroll scrollbar-hide bg-background-02">
        {children}
      </div>
    </PokiTokiNavigation>
  )
}

export default Layout
