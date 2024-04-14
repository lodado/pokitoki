'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useContext, useMemo } from 'react'

export interface ContextBuildHelperParams<ContextValuesType extends object> {
  id: string

  defaultContext?: ContextValuesType | undefined
}

type ProviderProps<ContextValuesType> = (ContextValuesType & { children: ReactNode }) | { children: ReactNode }

export const contextBuildHelper = <ContextValuesType extends object>({
  id,

  defaultContext,
}: ContextBuildHelperParams<ContextValuesType>) => {
  const Context = createContext<ContextValuesType | undefined>(defaultContext ?? undefined)

  const HelperProvider = ({ children, ...contextValue }: ProviderProps<ContextValuesType>) => {
    const [contextJsonKey, contextJsonValue] = [Object.keys(contextValue), Object.values(contextValue)]
    const value = useMemo(() => {
      return contextJsonKey.length > 0 ? contextValue : undefined
    }, [...contextJsonValue]) as ContextValuesType

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useHelperContext = () => {
    const context = useContext(Context)

    if (context != null) {
      return context
    }

    if (defaultContext != null) {
      return defaultContext
    }

    throw new Error(`${id} context must be provided in provider`)
  }

  HelperProvider.displayName = `${id}provider`

  return [HelperProvider, useHelperContext] as const
}
