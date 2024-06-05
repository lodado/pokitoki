import { Card } from '@custompackages/designsystem'
import { getDate, i18nDate, utc } from '@custompackages/shared'
import React from 'react'

import { getUserAttendanceWithinLast14days } from '@/app/api/protected/attendance/last14days/api'
import { getLocale } from '@/lib/next-inti'

const AttendanceCardList = async () => {
  const locale = await getLocale()
  const { data } = await getUserAttendanceWithinLast14days()

  return (
    <>
      {data.map(({ id, studyTime, timestamp }) => {
        const { format, daySuffix } = getDate('en')(timestamp)
        const fontIcon = studyTime > 5 * 60 ? '🔥' : '❌'

        const month = format('MMMM')
        const day = format('D')

        return (
          <Card
            key={id + timestamp}
            variant="checkList"
            className="flex-shrink-0 min-w-[7rem]"
            mainTitle={`${month} ${daySuffix(day)}`}
            subTitle={
              <span className="text-text-01">
                <span className="body-01-r text-text-03">
                  {String(Math.ceil(studyTime / 60)).padStart(2, '0')} :
                  {String(Math.ceil(studyTime) % 60).padStart(2, '0')}
                </span>
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
