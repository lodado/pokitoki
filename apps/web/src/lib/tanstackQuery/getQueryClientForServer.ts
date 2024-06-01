import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

import { queryClientOption } from './queryClientOption'

export const getQueryClientForServer = cache(
  () =>
    new QueryClient({
      ...queryClientOption,

      dehydrate: {
        // per default, only successful Queries are included,
        // this includes pending Queries as well
        shouldDehydrateQuery: (query: any) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    }),
)
