import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import { LayoutProps } from '@/interface/type'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return <>{children}</>
}

export default Layout
