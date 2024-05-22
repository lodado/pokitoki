import { SSRSuspense } from '@custompackages/designsystem'
import React from 'react'

import { getI18n } from '@/lib/i18n'

import { ResponsiveSectionTitle } from '../../../components/ResponsiveSectionTitle'
import HistoryList from './components/HistoryList'

const HistorySection = async () => {
  const i18nStat = await getI18n('STAT')

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
        <SSRSuspense fallback={<></>}>
          <HistoryList />
        </SSRSuspense>
      </div>
    </section>
  )
}

export default HistorySection
