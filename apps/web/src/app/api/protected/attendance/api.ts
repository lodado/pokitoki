import { i18nDate, timezone, utc } from '@custompackages/shared'

import request from '@/api'
import { getLoginSession } from '@/hooks/login'
import { Attendance } from '@/server/repository'

import { DeleteAttendanceByUserId, getAttendanceByUserId, updateAttendanceByUserId } from './utils/AttendanceStorage'

type AttendanceExceptUserData = Omit<Attendance, 'userId'>

export const getAttendance = async ({ year, month, day }: AttendanceExceptUserData) => {
  const response = await request<{ data: Attendance[] }>({
    method: 'GET',
    url: '/api/protected/attendance',
    params: { year, month, day },
  })

  return response
}

export const putAttendance = async () => {
  const localTime = utc().local().format()
  const offset = localTime.match(/[+-]\d\d:\d\d$/)[0]

  const response = request<Attendance>({
    method: 'PUT',
    url: '/api/protected/attendance',
    params: { offset },
  })
  return response
}
