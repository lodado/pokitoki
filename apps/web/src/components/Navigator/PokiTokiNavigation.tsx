import { ICON_GNB_1, ICON_GNB_2, ICON_LOGO } from '@custompackages/design-assets'
import { Navigation } from '@custompackages/designsystem'
import React, { ReactNode, useMemo, useRef } from 'react'

import { getI18n } from '@/lib/i18n'

import { Logo } from '../Logo'
import NavigationLinkButton from './components/NavigationLinkButton'
import NavigationTab from './components/NavigationTab'

const PokiTokiNavigation = async ({ children }: { children: ReactNode }) => {
  const t = await getI18n('COMMON')
  const dashboardI18n = await getI18n('DASHBOARD')

  const dashboardTabList = [
    {
      key: 'LEARNING-STATUS',
      value: dashboardI18n('LEARNING-STATUS'),
      Icon: <ICON_GNB_1 fillOverwrite="inherit" />,
    },
    {
      key: 'SELECTIVE-LEARNING',
      value: dashboardI18n('SELECTIVE-LEARNING'),
      Icon: <ICON_GNB_2 fillOverwrite="inherit" />,
    },
  ]

  return (
    <>
      <header className="fixed left-1/2 -translate-x-1/2 w-screen md:w-[768px] justify-between align-middle top-0 bg-surface-up h-12 px-spacing-4 border-b border-solid border-border-01">
        <nav className="flex justify-between w-full h-full align-middle">
          <NavigationLinkButton className="flex flex-row items-center w-max">
            <Logo title={t('LOGO')} />
            <ICON_LOGO width="30px" height="30px" className="mb-2" />
          </NavigationLinkButton>

          <div className="hidden sm:flex">
            <NavigationTab tabList={dashboardTabList} />
          </div>

          <NavigationLinkButton>프로필</NavigationLinkButton>
        </nav>
      </header>
      <div className="h-12" role="presentation none" />
      {children}
      <Navigation className="bottom-0 flex items-center justify-center border border-solid sm:hidden border-border-01 bg-surface-up shadow-profile px-spacing-4">
        <NavigationTab tabList={dashboardTabList} />
      </Navigation>
    </>
  )
}

export default PokiTokiNavigation
