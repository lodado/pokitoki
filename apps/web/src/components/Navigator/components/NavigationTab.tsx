'use client'

import { ICON_GNB_1, ICON_GNB_2 } from '@custompackages/design-assets'
import React, { useState } from 'react'

import { cva } from '@/lib/cva'
import { useI18n } from '@/lib/i18n'

import NavigationLinkButton from './NavigationLinkButton'

type TabTypes = string

const indicatorStyles = cva(
  [
    'w-[115px]',
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
        'LEARNING-STATUS': 'translate-x-[-5px]',
        'SELECTIVE-LEARNING': 'translate-x-[115px]',
      },
    },
    defaultVariants: {
      position: 'LEARNING-STATUS',
    },
  },
)

const NavigationTabList = (t: any) => [
  { key: 'LEARNING-STATUS', value: t('LEARNING-STATUS'), Icon: <ICON_GNB_1 /> },
  { key: 'SELECTIVE-LEARNING', value: t('SELECTIVE-LEARNING'), Icon: <ICON_GNB_2 /> },
]

const NavigationTab = () => {
  const t = useI18n('DASHBOARD')
  const [activeTab, setActiveTab] = useState<TabTypes>(t('LEARNING-STATUS'))

  const handleTabClick = (tab: TabTypes) => {
    setActiveTab(tab)
  }

  return (
    <div className="relative flex">
      {NavigationTabList(t).map(({ key, value, Icon }) => (
        <NavigationLinkButton
          key={key}
          className={`flex gap-1 items-center flex-row p-2 cursor-pointer w-[120px] text-secondary-default ${
            activeTab === value ? '' : ''
          }`}
          onClick={() => handleTabClick(key as TabTypes)}
        >
          {Icon}
          {value.toUpperCase()}
        </NavigationLinkButton>
      ))}
      <span className={indicatorStyles({ position: activeTab! as any })} />
    </div>
  )
}

export default NavigationTab
