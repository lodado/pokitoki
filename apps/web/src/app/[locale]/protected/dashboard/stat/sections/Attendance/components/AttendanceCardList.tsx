import { Badge, BasicCardTemplate, Card } from '@custompackages/designsystem'
import { i18nDate } from '@custompackages/shared'
import React from 'react'

import { getAttendance } from '@/app/api/protected/attendance/api'
import { getLocale } from '@/lib/next-inti'

const AttendanceCardList = async () => {
  const locale = await getLocale()
  const dateFormat = i18nDate(locale, Date.now()).format()

  const year = i18nDate(locale).year()
  const month = i18nDate(locale).month()

  const Attendance = await getAttendance({ year, month })

  const fontIcon = true ? '🔥' : '❌'

  console.log(Attendance)

  return (
    <>
      <Card
        variant="checkList"
        className="flex-shrink-0"
        mainTitle="12일"
        subTitle={
          <span className="text-text-01">
            {'학습 시간 '}
            <span className="body-01-r text-text-03">01 : 32</span>
          </span>
        }
        icon={<span className="text-4xl">{fontIcon}</span>}
      />
      <Card
        variant="checkList"
        className="flex-shrink-0"
        mainTitle="12일"
        subTitle={
          <span className="text-text-01">
            {'학습 시간 '}
            <span className="body-01-r text-text-03">01 : 32</span>
          </span>
        }
        icon={<span className="text-4xl">{fontIcon}</span>}
      />{' '}
      <Card
        variant="checkList"
        className="flex-shrink-0"
        mainTitle="12일"
        subTitle={
          <span className="text-text-01">
            {'학습 시간 '}
            <span className="body-01-r text-text-03">01 : 32</span>
          </span>
        }
        icon={<span className="text-4xl">{fontIcon}</span>}
      />{' '}
      <Card
        variant="checkList"
        className="flex-shrink-0"
        mainTitle="12일"
        subTitle={
          <span className="text-text-01">
            {'학습 시간 '}
            <span className="body-01-r text-text-03">01 : 32</span>
          </span>
        }
        icon={<span className="text-4xl">{fontIcon}</span>}
      />{' '}
      <Card
        variant="checkList"
        className="flex-shrink-0"
        mainTitle="12일"
        subTitle={
          <span className="text-text-01">
            {'학습 시간 '}
            <span className="body-01-r text-text-03">01 : 32</span>
          </span>
        }
        icon={<span className="text-4xl">{fontIcon}</span>}
      />{' '}
      <Card
        variant="checkList"
        className="flex-shrink-0"
        mainTitle="12일"
        subTitle={
          <span className="text-text-01">
            {'학습 시간 '}
            <span className="body-01-r text-text-03">01 : 32</span>
          </span>
        }
        icon={<span className="text-4xl">{fontIcon}</span>}
      />
    </>
  )
}

export default AttendanceCardList
