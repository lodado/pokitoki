import { ICON_GNB_1, ICON_GNB_2, ICON_LOGO } from '@custompackages/design-assets'
import { Navigation } from '@custompackages/designsystem'
import React, { ReactNode, useMemo, useRef } from 'react'

import { getI18n } from '@/lib/i18n'

import { Logo } from '../Logo'
import { Profile } from '../Profile'
import NavigationLinkButton from './components/NavigationLinkButton'
import NavigationTab from './components/NavigationTab'
import { LEARNING_STATUS, SELECTIVE_LEARNING } from './constant'

const PokiTokiNavigation = async ({ children }: { children: ReactNode }) => {
  const t = await getI18n('COMMON')
  const dashboardI18n = await getI18n('DASHBOARD')

  const dashboardTabList = [
    {
      key: LEARNING_STATUS,
      value: dashboardI18n(LEARNING_STATUS),
      Icon: <ICON_GNB_1 fillOverwrite="inherit" />,
      link: '/protected/dashboard',
    },
    {
      key: SELECTIVE_LEARNING,
      value: dashboardI18n(SELECTIVE_LEARNING),
      Icon: <ICON_GNB_2 fillOverwrite="inherit" />,
      link: '/protected/dashboard/selfstudy',
    },
  ]

  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <div className="sticky top-0 flex flex-row justify-center w-screen h-12 border-b border-solid header-content border-b-1 border-border-01 z-nav">
        <header className="sticky top-0 w-screen md:w-[768px] justify-between align-middle bg-surface-up h-12 px-spacing-4 border-b border-solid border-border-01">
          <nav className="flex justify-between w-full h-full align-middle ">
            <NavigationLinkButton className="flex flex-row items-center w-max">
              <Logo className="w-[75px]" title={t('LOGO')} />
              <ICON_LOGO width="30px" height="30px" className="mb-2" />
            </NavigationLinkButton>

            <div className="hidden sm:flex">
              <NavigationTab tabList={dashboardTabList} />
            </div>

            <button type="button">
              <Profile
                src="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/avat.png"
                alt="user profile"
                width={28}
                height={28}
              />
            </button>
          </nav>
        </header>
      </div>

      <div className="flex flex-col items-center w-full md:w-[768px] flex-grow">{children}</div>

      <Navigation className="bottom-0 flex items-center justify-center flex-grow-0 h-12 border border-solid sm:hidden border-border-01 bg-surface-up shadow-profile px-spacing-4">
        <NavigationTab tabList={dashboardTabList} />
      </Navigation>
    </div>
  )
}

export default PokiTokiNavigation
