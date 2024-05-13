import { utc } from '@custompackages/shared'
import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import AttendanceServiceInstance from '@/server/service/Attendance/AttandanceService'

const { readAttendance, upsertAttendance } = AttendanceServiceInstance

export const GET = async (req: NextRequest) => {
  try {
    const year = Number(req.nextUrl.searchParams.get('year'))
    const month = Number(req.nextUrl.searchParams.get('month'))

    const { user } = await getLoginSession()
    const userId = user.id

    const monthAttendanceData = await readAttendance({ userId, year, month })

    return NextResponse.json(
      { monthAttendanceData },
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

export const PUT = async (req: NextRequest) => {
  try {
    const nowUtc = utc()
    const offset = req.nextUrl.searchParams.get('offset')!
    const attendance = Number(req.nextUrl.searchParams.get('attendance'))

    const offsetHours = parseInt(offset.substring(1, 3), 10)
    const offsetMinutes = parseInt(offset.substring(4), 10)

    const localTimeWithOffset = offset.startsWith('+')
      ? nowUtc.add(offsetHours, 'hour').add(offsetMinutes, 'minute')
      : nowUtc.subtract(offsetHours, 'hour').subtract(offsetMinutes, 'minute')

    const year = localTimeWithOffset.year()
    const month = localTimeWithOffset.month() + 1

    const { user } = await getLoginSession()
    const userId = user.id

    await upsertAttendance({ userId, year, month, attendance })

    return NextResponse.json(null, { status: 200 })
  } catch (e) {
    console.log(e)

    return Response.json({}, { status: 400 })
  }
}
