import { getDate, getOffset, i18nDate, tz, utc } from '@custompackages/shared'

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

/**
 * TODO: timezone 정보 추가
 */
export const putAttendance = async () => {
  const { unix: timestamp } = getDate('ko')()

  const response = request<Attendance>({
    method: 'PUT',
    url: '/api/protected/attendance',
    params: { timestamp },
  })
  return response
}
