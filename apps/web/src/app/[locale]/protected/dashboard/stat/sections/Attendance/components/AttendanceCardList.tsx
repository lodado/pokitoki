import { Card } from '@custompackages/designsystem'
import { getDate } from '@custompackages/shared'
import React from 'react'

import { getUserAttendanceWithinLast14days } from '@/app/api/protected/attendance/last14days/api'
import { getLocale } from '@/lib/next-inti'

const AttendanceCardList = async () => {
  const locale = await getLocale()

  const { unix } = getDate(locale)()
  const { data } = await getUserAttendanceWithinLast14days({ timestamp: unix })

  return (
    <>
      {data.map(({ id, studyTime, timestamp }: any) => {
        const { minute, second, day: timestampDay } = getDate(locale)(timestamp * 1000)

        const fontIcon = minute > 5 ? '🔥' : '❌'

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
                  {minute + second > 0 && `${minute}:${second / minute}`}1:52
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
