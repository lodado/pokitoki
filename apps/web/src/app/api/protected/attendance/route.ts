import { utc } from '@custompackages/shared'
import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import AttendanceServiceInstance from '@/server/service/Attendance/AttandanceService'

const { readAttendance, updateUserStudyTime } = AttendanceServiceInstance

export const POST = async (req: NextRequest) => {
  try {
    const offset = Number(req.nextUrl.searchParams.get('offset')!)
    const studyTime = Number(req.nextUrl.searchParams.get('studyTime')!)

    const localTime = utc().utcOffset(offset)
    const timestamp = localTime.startOf('day').valueOf()

    const { user } = await getLoginSession()
    const userId = user.id

    await updateUserStudyTime({ userId, timestamp, studyTime, offset })

    return NextResponse.json(null, { status: 200 })
  } catch (e) {
    console.log(e)

    return Response.json({}, { status: 400 })
  }
}
