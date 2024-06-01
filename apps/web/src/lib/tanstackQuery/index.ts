import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { ReactQueryProvider } from './reactQueryProvider'

export { ReactQueryProvider, useMutation, useQuery, useQueryClient, useSuspenseQuery }
export { dehydrate, HydrationBoundary, QueryClient }

export * from './getQueryClientForServer'
