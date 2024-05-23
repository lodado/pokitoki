import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import { getLoginSession } from '@/hooks/login'
import { LayoutProps } from '@/interface/type'
import { LoginSessionProvider } from '@/lib/nextAuth'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  const session = await getLoginSession()

  return (
    <LoginSessionProvider session={session}>
      <div className="fixed w-full h-12 border-b border-solid border-b-1 border-border-01" role="presentation none" />

      <ResponsiveLayout className="">{children}</ResponsiveLayout>
    </LoginSessionProvider>
  )
}

export default Layout
