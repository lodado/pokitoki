'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren, useState } from 'react'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        initialData: [],
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,

        // above 0 to avoid refetching immediately on the client
        staleTime: 20 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

/**
 * refactor: next14 불완전한 지원으로 인하여 일시적인 react-query 삭제
 */
const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  /*  
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools />
    </QueryClientProvider>
  )
*/

  return children
}

export default ReactQueryProvider
