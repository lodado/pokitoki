import { ResponsiveLayout } from '@custompackages/designsystem'
import React from 'react'

import { LayoutProps } from '@/interface/type'

const Layout: React.FunctionComponent<LayoutProps> = async ({ children, params: { locale } }) => {
  return (
    <>
      <div className="flex-grow w-full px-6 pt-4 bg-background-02">{children}</div>
    </>
  )
}

export default Layout
