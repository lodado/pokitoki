import { i18nDate, timezone, utc } from '@custompackages/shared'

import request from '@/api'
import { getLoginSession } from '@/hooks/login'
import { Attendance } from '@/server/repository'

type AttendanceExceptUserData = Omit<Attendance, 'userId'>

export const getUserAttendanceWithinLast14days = async ({ year, month, day }: AttendanceExceptUserData) => {
  const response = await request<{ data: Attendance[] }>({
    method: 'GET',
    url: '/api/protected/attendance/last14days',
    params: { year, month, day },
  })

  return response
}
