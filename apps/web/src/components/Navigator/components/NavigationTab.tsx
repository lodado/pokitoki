'use client'

import React, { cloneElement, ReactElement, useMemo, useState } from 'react'

import { cva } from '@/lib/cva'

import NavigationLinkButton from './NavigationLinkButton'

export interface TabItem {
  key: string
  value: string
  Icon: ReactElement
}

// NavigationTab 컴포넌트의 props 타입을 정의
export interface NavigationTabProps {
  tabList: TabItem[] // 외부에서 주입받는 탭 리스트
}

export type TabTypes = string

const indicatorStyles = cva(
  [
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
        'LEARNING-STATUS': 'translate-x-0',
        'SELECTIVE-LEARNING': 'translate-x-full',
      },
    },
    defaultVariants: {
      position: 'LEARNING-STATUS',
    },
  },
)

const NavigationTab: React.FC<NavigationTabProps> = ({ tabList }) => {
  const [activeTab, setActiveTab] = useState<TabTypes>(tabList[0].key)
  const tabWidth = 100 / tabList.length

  const handleTabClick = (tab: TabTypes) => {
    setActiveTab(tab)
  }

  return (
    <div className="relative body-01-r flex w-full max-w-[50vw]">
      {tabList.map(({ key, value, Icon }) => (
        <NavigationLinkButton
          key={key}
          style={{ width: `${tabWidth}%` }}
          className={`w-full flex gap-1 justify-center items-center flex-row p-2 cursor-pointer text-secondary-default ${
            activeTab === key ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(key as TabTypes)}
        >
          {cloneElement(Icon, {
            className: activeTab === key ? 'fill-primary-01-default' : 'fill-cancel-default',
          })}
          <span className="w-full text-center">{value}</span>
        </NavigationLinkButton>
      ))}
      <span className={indicatorStyles({ position: activeTab! as any })} style={{ width: `${tabWidth}%` }} />
    </div>
  )
}

export default NavigationTab
