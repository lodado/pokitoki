import { dayjs, getDate, getOffset, i18nDate, tz, utc } from '@custompackages/shared'
import { getLocale } from 'next-intl/server'

import request from '@/api'
import { getLoginSession } from '@/hooks/login'
import { Attendance } from '@/server/repository'

import { DeleteAttendanceByUserId, getAttendanceByUserId, updateAttendanceByUserId } from './utils/AttendanceStorage'

type AttendanceExceptUserData = Omit<Attendance, 'userId'>

/* 만들때 재구축
export const getAttendance = async ({ timestamp }: AttendanceExceptUserData) => {
  const localTime = utc().local().format()
  const offset = localTime.match(/[+-]\d\d:\d\d$/)[0]

  const response = await request<{ data: Attendance[] }>({
    method: 'GET',
    url: '/api/protected/attendance',
    params: { timestamp, offset },
  })

  return response
}
*/

/*
export const putAttendance = async ({ locale, userId }: { locale: string; userId: string }) => {
  const offset = getOffset()
  const { now, year, month, day } = getDate(locale)()

  const doesUserAlreadyAttend = await getAttendanceByUserId({ userId, year, day, month, offset })
}
*/

export const postUserStudyTime = async ({ studyTime }: { studyTime: number }) => {
  const offset = getOffset()

  request<Attendance>({
    method: 'POST',
    url: '/api/protected/attendance',
    params: { studyTime, offset },
    isSignalRequired: false,
  })
}
