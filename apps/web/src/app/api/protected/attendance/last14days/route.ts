import { getDate, utc } from '@custompackages/shared'
import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import AttendanceServiceInstance from '@/server/service/Attendance/AttandanceService'

const { readUserAttendanceWithinLast14days } = AttendanceServiceInstance

export const GET = async (req: NextRequest) => {
  try {
    const timestamp = Number(req.nextUrl.searchParams.get('timestamp'))

    const { year, month, day } = getDate('en')(timestamp * 1000)

    const { user } = await getLoginSession()
    const userId = user.id
    const data = await readUserAttendanceWithinLast14days({ userId, year, month, day })

    return NextResponse.json(
      { data },
      {
        status: 200,
        headers: new Headers({
          'Cache-Control': 'private, max-age=600',
        }),
      },
    )
  } catch (e) {
    console.log('error', e)

    return Response.json({}, { status: 400 })
  }
}
