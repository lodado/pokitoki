'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { createLog } from '../utils/logger'
import { LogParamsProvider } from './LogParamsProvider'
import { logParams } from './type'

export interface LogScreenProps {
  children: React.ReactNode
  params?: logParams
}

export const LogScreen = ({ children, params = '' }: LogScreenProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const url = `${pathname}?${searchParams}`
  React.useEffect(() => {
    createLog({ level: 'info', log: params, event: `enter ${url}` })
  }, [pathname, searchParams])

  return <LogParamsProvider params={pathname}>{children}</LogParamsProvider>
}
