import { Card } from '@custompackages/designsystem'
import { getDate, utc } from '@custompackages/shared'
import React from 'react'

import { getUserAttendanceWithinLast14days } from '@/app/api/protected/attendance/last14days/api'
import { getLocale } from '@/lib/next-inti'

const AttendanceCardList = async () => {
  const locale = await getLocale()
  const { data } = await getUserAttendanceWithinLast14days()

  return (
    <>
      {data.map(({ id, studyTime, timestamp }) => {
        const { minute, second, day: timestampDay } = getDate(locale)(timestamp)

        const fontIcon = studyTime > 5 * 60 ? '🔥' : '❌'

        return (
          <Card
            key={id}
            variant="checkList"
            className="flex-shrink-0 min-w-[7rem]"
            mainTitle={`${timestampDay}일`}
            subTitle={
              <span className="text-text-01">
                {'학습 시간 '}
                <span className="body-01-r text-text-03">
                  {Math.ceil(studyTime / (60 * 1000))} : {Math.ceil(studyTime / 1000) % 60} sec
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
