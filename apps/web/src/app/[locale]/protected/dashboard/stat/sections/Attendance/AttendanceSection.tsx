import { SSRSuspense } from '@custompackages/designsystem'
import { dayjs, i18nDate } from '@custompackages/shared'
import React from 'react'

import { getLoginSession } from '@/hooks/login'
import { LayoutProps, LocaleProps } from '@/interface'
import { getI18n } from '@/lib/i18n'
import { getLocale } from '@/lib/next-inti'

import { ResponsiveSectionTitle } from '../../../components/ResponsiveSectionTitle'
import AttendanceCardList from './components/AttendanceCardList'

const AttendanceSection = async () => {
  const { user } = await getLoginSession()
  const i18nStat = await getI18n('STAT')
  const locale = await getLocale()
  const monthName = i18nDate(locale).format('MMMM') // 'MMMM' 포맷으로 월 이름 추출

  return (
    <section className="flex flex-col ">
      <div className="flex flex-row items-center justify-between">
        <ResponsiveSectionTitle
          title={i18nStat('ATTENDANCE-TITLE', { month: monthName })}
          subTitle={i18nStat('ATTENDANCE-DESCRIPTION', { username: user.name })}
          ButtonText={i18nStat('ATTENDANCE-BUTTON')}
          difficulty=""
        />
      </div>
      <ul className="flex flex-row flex-shrink-0 items-center gap-4 p-2 overflow-x-scroll h-[9.5rem]">
        <SSRSuspense>
          <AttendanceCardList />
        </SSRSuspense>
      </ul>
    </section>
  )
}

export default AttendanceSection
