'use client'

import { ICON_GNB_1, ICON_GNB_2 } from '@custompackages/design-assets'
import React, { cloneElement, useMemo, useState } from 'react'

import { cva } from '@/lib/cva'
import { useI18n } from '@/lib/i18n'

import NavigationLinkButton from './NavigationLinkButton'

type TabTypes = string

const indicatorStyles = cva(
  [
    'w-[90px]',
    'absolute',
    'bottom-0',
    'mb-[0.15rem]',
    'rounded-lg',
    'h-[0.2rem]',
    'bg-primary-01-default',
    'transition-all',
    'duration-300',
    'ease-in-out',
  ],
  {
    variants: {
      position: {
        'LEARNING-STATUS': 'translate-x-[0px]',
        'SELECTIVE-LEARNING': 'translate-x-[90px]',
      },
    },
    defaultVariants: {
      position: 'LEARNING-STATUS',
    },
  },
)

const NavigationTab = () => {
  const t = useI18n('DASHBOARD')
  const [activeTab, setActiveTab] = useState<TabTypes>('LEARNING-STATUS')

  const NavigationTabList = useMemo(
    () => [
      {
        key: 'LEARNING-STATUS',
        value: t('LEARNING-STATUS'),
        Icon: <ICON_GNB_1 fillOverwrite="inherit" />,
      },
      { key: 'SELECTIVE-LEARNING', value: t('SELECTIVE-LEARNING'), Icon: <ICON_GNB_2 fillOverwrite="inherit" /> },
    ],
    [activeTab],
  )

  const handleTabClick = (tab: TabTypes) => {
    setActiveTab(tab)
  }

  return (
    <div className="relative flex">
      {NavigationTabList.map(({ key, value, Icon }) => (
        <NavigationLinkButton
          key={key}
          className={`flex gap-1 items-center flex-row p-2 cursor-pointer w-[90px] body-01-r text-secondary-default ${
            activeTab === key ? '' : ''
          }`}
          onClick={() => handleTabClick(key as TabTypes)}
        >
          {cloneElement(Icon, { className: activeTab === key ? 'fill-primary-01-default' : 'fill-cancel-default' })}
          <span className="min-w-[40px] text-center ">{value.toUpperCase()}</span>
        </NavigationLinkButton>
      ))}
      <span className={indicatorStyles({ position: activeTab! as any })} />
    </div>
  )
}

export default NavigationTab
