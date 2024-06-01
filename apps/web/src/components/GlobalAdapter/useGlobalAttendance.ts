import { getDate, getOffset } from '@custompackages/shared'
import { useLocale } from 'next-intl'
import React, { useEffect } from 'react'

import { postUserStudyTime } from '@/app/api/protected/attendance/api'
import { getAttendanceByUserId, updateAttendanceByUserId } from '@/app/api/protected/attendance/utils/AttendanceStorage'
import { useLoginSession } from '@/hooks/login'

const useGlobalAttendance = () => {
  const user = useLoginSession()
  const locale = useLocale()

  const createTodayUserAttendance = async () => {
    const { year, month, day } = getDate(locale)()
    const offset = getOffset()

    const data = await getAttendanceByUserId({ userId: user.data?.user.id!, year, day, month, offset })

    if (!data) {
      updateAttendanceByUserId({ userId: user.data?.user.id!, year, day, month, offset })
      postUserStudyTime({ studyTime: 0 })
    }
  }

  useEffect(() => {
    createTodayUserAttendance()
  }, [])
}

export default useGlobalAttendance
