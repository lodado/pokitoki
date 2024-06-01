import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

import { getUserToken } from '@/app/api/protected/token/api'
import { getQueryClientForServer } from '@/lib/tanstackQuery'

import GlobalAdapter from './GlobalAdapter.client'

const GlobalAdapterServer = async () => {
  const queryClient = getQueryClientForServer()

  await queryClient.prefetchQuery({
    queryKey: ['userToken'],
    queryFn: getUserToken,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GlobalAdapter />
    </HydrationBoundary>
  )
}

export default GlobalAdapterServer
