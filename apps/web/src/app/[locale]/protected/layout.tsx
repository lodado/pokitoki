import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import { getLoginSession } from '@/hooks/login'
import { LayoutProps } from '@/interface/type'
import { LoginSessionProvider } from '@/lib/nextAuth'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return (
    <>
      <>{children}</>
    </>
  )
}

export default Layout
