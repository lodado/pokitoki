'use client'

import React, { useState } from 'react'

import { cva } from '@/lib/cva'

import NavigationLinkButton from './NavigationLinkButton'

type TabTypes = string

const indicatorStyles = cva(
  [
    'w-[90px]',
    'absolute',
    'bottom-0',
    'border-0',
    'h-0.5',
    'bg-blue-500',
    'transition-all',
    'duration-300',
    'ease-in-out',
  ],
  {
    variants: {
      position: {
        학습현황: 'translate-x-0',
        선택학습: 'translate-x-[90px]',
      },
    },
    defaultVariants: {
      position: '학습현황',
    },
  },
)

const NavigationTab = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>('tab1')

  const handleTabClick = (tab: TabTypes) => {
    setActiveTab(tab)
  }

  return (
    <div>
      <div className="relative flex ">
        {['학습 현황', '선택학습'].map((tab: string) => (
          <NavigationLinkButton
            key={tab}
            className={`p-2 cursor-pointer ${activeTab === tab ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
            onClick={() => handleTabClick(tab as TabTypes)}
            href={`/${tab}`}
          >
            {tab.toUpperCase()}
          </NavigationLinkButton>
        ))}
        <span className={indicatorStyles({ position: activeTab })} />
      </div>
    </div>
  )
}

export default NavigationTab
