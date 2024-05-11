import { dayjs, i18nDayJs } from '@custompackages/shared'
import React from 'react'

import { getLoginSession } from '@/hooks/login'
import { LayoutProps, LocaleProps } from '@/interface'
import { getI18n } from '@/lib/i18n'

import { ResponsiveSectionTitle } from '../components/ResponsiveSectionTitle'

const AttendanceSection = async ({ params: { locale } }: LocaleProps) => {
  const { user } = await getLoginSession()
  const i18nStat = await getI18n('STAT')

  const monthName = i18nDayJs(locale).format('MMMM') // 'MMMM' 포맷으로 월 이름 추출

  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <ResponsiveSectionTitle
          title={i18nStat('ATTENDANCE-TITLE', { month: monthName })}
          subTitle={i18nStat('ATTENDANCE-DESCRIPTION', { username: user.name })}
          ButtonText={i18nStat('ATTENDANCE-BUTTON')}
          difficulty=""
        />
      </div>
    </section>
  )
}

export default AttendanceSection
