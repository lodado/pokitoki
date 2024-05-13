import { Badge, BasicCardTemplate, Card } from '@custompackages/designsystem'
import { i18nDate, utc } from '@custompackages/shared'
import { at } from 'lodash-es'
import React from 'react'

import { getAttendance } from '@/app/api/protected/attendance/api'
import { getLocale } from '@/lib/next-inti'

const AttendanceCardList = async () => {
  const locale = await getLocale()

  const dayJs = i18nDate(locale)
  const today = dayJs
  const year = dayJs.year()
  const month = dayJs.month() + 1
  const day = dayJs.daysInMonth()

  const { data } = await getAttendance({ year, month, day })

  console.log(data)

  const pastDates = Array.from({ length: Math.min(14, day + 1) - 1 }, (_, index) =>
    Number(today.subtract(index, 'day').format('D')),
  )

  return (
    <>
      {pastDates.map((date) => {
        const isAttended = true
        const fontIcon = isAttended ? '🔥' : '❌'

        return (
          <Card
            key={date}
            variant="checkList"
            className="flex-shrink-0"
            mainTitle={`${date}일`}
            subTitle={
              <span className="text-text-01">
                {'학습 시간 '}
                <span className="body-01-r text-text-03">01 : 32</span>
              </span>
            }
            icon={<span className="text-4xl">{fontIcon}</span>}
          />
        )
      })}
    </>
  )
}

export default AttendanceCardList
