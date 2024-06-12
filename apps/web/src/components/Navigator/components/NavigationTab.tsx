'use client'

import Link from 'next/link'
import React, { cloneElement, memo, ReactElement, useEffect, useMemo, useRef, useState } from 'react'

import { useUrl } from '@/hooks'
import { cva } from '@/lib/cva'
import { atom, useAtom } from '@/lib/jotai'

import { LEARNING_STATUS, SELECTIVE_LEARNING } from '../constant'
import { activeTabAtom } from './atom'
import NavigationLinkButton from './NavigationLinkButton'

export interface TabItem {
  key: string
  value: string
  Icon: ReactElement

  link: string
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
        [LEARNING_STATUS]: 'translate-x-0',
        [SELECTIVE_LEARNING]: 'translate-x-full',
      },
    },
    defaultVariants: {
      position: 'LEARNING-STATUS',
    },
  },
)

const NavigationTab: React.FC<NavigationTabProps> = memo(({ tabList }) => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)

  const tabWidth = 100 / tabList.length

  const handleTabClick = (tab: TabTypes) => {
    setActiveTab(tab)
  }

  return (
    <div className="relative body-01-r flex w-full min-w-[200px] max-w-[50vw]">
      {tabList.map(({ key, value, Icon, link }) => (
        <Link key={key} href={link} style={{ width: `${tabWidth}%` }} className="w-full" scroll={false}>
          <NavigationLinkButton
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
        </Link>
      ))}
      <span className={indicatorStyles({ position: activeTab! as any })} style={{ width: `${tabWidth}%` }} />
    </div>
  )
})

export default NavigationTab
