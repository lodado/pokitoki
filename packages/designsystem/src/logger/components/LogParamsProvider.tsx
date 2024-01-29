'use client'

import React from 'react'

import { logParams } from './type'

interface LogProviderProps {
  children: React.ReactNode
  params?: logParams
}

const LogParamsContext = React.createContext<logParams>('')

export function useLogParams() {
  const context = React.useContext(LogParamsContext)
  if (!context) return ''

  return context
}

export const LogParamsProvider = ({ children, params = '' }: LogProviderProps) => {
  'use client'

  const logParam = useLogParams()
  const value = logParam ? `${logParam}/${params}` : params

  return <LogParamsContext.Provider value={value}>{children}</LogParamsContext.Provider>
}
