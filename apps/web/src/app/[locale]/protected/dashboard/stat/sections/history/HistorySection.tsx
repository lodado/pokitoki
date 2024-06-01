import { SSRSuspense } from '@custompackages/designsystem'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React, { Suspense } from 'react'

import { getRecentHistoryList } from '@/app/api/chatgpt/thread/history/api'
import { getI18n } from '@/lib/i18n'
import { getQueryClientForServer } from '@/lib/tanstackQuery'

import { ResponsiveSectionTitle } from '../../../components/ResponsiveSectionTitle'
import HistoryList from './components/HistoryList'

const HistorySection = async () => {
  const queryClient = getQueryClientForServer()
  const i18nStat = await getI18n('STAT')

  await queryClient.prefetchQuery({
    queryKey: ['stat/history/recentHistoryList'],
    queryFn: () => getRecentHistoryList(),
  })

  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <ResponsiveSectionTitle
          title={i18nStat('HISTORY-SCRIPT-TITLE')}
          subTitle={i18nStat('HISTORY-SCRIPT-DESCRIPTION')}
          ButtonText={i18nStat('HISTORY-SCRIPT-BUTTON')}
          difficulty=""
        />
      </div>

      <div className="flex flex-col gap-4 p-2 min-h-[300px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HistoryList />
        </HydrationBoundary>
      </div>
    </section>
  )
}

export default HistorySection
