import { getDate, utc } from '@custompackages/shared'
import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import AttendanceServiceInstance from '@/server/service/Attendance/AttandanceService'

const { readUserAttendanceWithinLast14days } = AttendanceServiceInstance

export const GET = async (req: NextRequest) => {
  try {
    const offset = Number(req.nextUrl.searchParams.get('offset')!)
    const localTime = utc().utcOffset(offset)
    const timestamp = localTime.valueOf()

    const { user } = await getLoginSession()
    const userId = user.id
    const data = await readUserAttendanceWithinLast14days({ userId, timestamp })

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
