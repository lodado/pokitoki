'use client'

import { contextBuildHelper } from '@custompackages/shared'
import { Dispatch, PropsWithChildren, SetStateAction, useReducer, useState } from 'react'

const [ErrorContextProvider, useErrorGroupBoundary] = contextBuildHelper<{
  refresh: number
  refreshTrigger: () => void
}>({
  id: 'errorProvider',
  option: {
    contextThrowNeed: false,
  },
})

const ErrorGroupBoundaryProvider = ({ children }: PropsWithChildren) => {
  const [refresh, setRefresh] = useState(0)

  const refreshTrigger = () => {
    setRefresh((prev) => prev + 1)
  }

  return (
    <ErrorContextProvider refresh={refresh} refreshTrigger={refreshTrigger}>
      {children}
    </ErrorContextProvider>
  )
}

const useErrorGroupBoundaryContext = () => {
  return useErrorGroupBoundary()!
}

export { ErrorGroupBoundaryProvider, useErrorGroupBoundaryContext }
