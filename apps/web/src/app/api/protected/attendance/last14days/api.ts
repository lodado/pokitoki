import { getOffset, i18nDate, utc } from '@custompackages/shared'

import request from '@/api'
import { AttendanceItem } from '@/server/repository'

export const getUserAttendanceWithinLast14days = async () => {
  const offset = getOffset()

  const response = await request<{ data: AttendanceItem[] }>({
    method: 'GET',
    url: '/api/protected/attendance/last14days',
    params: { offset },
  })

  return response
}
