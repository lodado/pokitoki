import { timezone, utc } from '@custompackages/shared'

import request from '@/api'
import { Attendance } from '@/server/repository'

type AttendanceExceptUserData = Omit<Attendance, 'userId'>

export const getAttendance = async (attendance: AttendanceExceptUserData) => {
  const response = request<Attendance>({
    method: 'GET',
    url: '/api/protected/attendance',
    params: { ...attendance },
  })
  return response
}

export const putAttendance = async () => {
  const localTime = utc().local().format()
  const offset = localTime.match(/[+-]\d\d:\d\d$/)[0]

  const response = request<Attendance>({
    method: 'PUT',
    url: '/api/protected/attendance',
    params: { offset, attendance: 10 },
  })
  return response
}
