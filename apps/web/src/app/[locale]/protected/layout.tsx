import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import { PokiTokiNavigation } from '@/components'
import { getLoginSession } from '@/hooks/login'
import { LayoutProps } from '@/interface/type'
import { LoginSessionProvider } from '@/lib/nextAuth'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return <PokiTokiNavigation>{children}</PokiTokiNavigation>
}

export default Layout
