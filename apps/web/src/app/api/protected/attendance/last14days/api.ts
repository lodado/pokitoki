import { i18nDate, timezone, utc } from '@custompackages/shared'

import request from '@/api'
import { getLoginSession } from '@/hooks/login'
import { Attendance } from '@/server/repository'

export const getUserAttendanceWithinLast14days = async ({ timestamp }: { timestamp: number }) => {
  const response = await request<{ data: Attendance[] }>({
    method: 'GET',
    url: '/api/protected/attendance/last14days',
    params: { timestamp },
  })

  return response
}
