import { utc } from '@custompackages/shared'
import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import AttendanceServiceInstance from '@/server/service/Attendance/AttandanceService'

const { readAttendance, upsertAttendance, addUserStudyTime } = AttendanceServiceInstance

export const PUT = async (req: NextRequest) => {
  try {
    const offset = Number(req.nextUrl.searchParams.get('offset')!)
    const localTime = utc().utcOffset(offset)
    const timestamp = localTime.startOf('day').valueOf()

    const { user } = await getLoginSession()
    const userId = user.id

    const result = await upsertAttendance({ userId, timestamp })

    return NextResponse.json(result, { status: 200 })
  } catch (e) {
    console.log(e)

    return Response.json({}, { status: 400 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    console.log('wtf?', body)

    const { studyTime } = body

    const { user } = await getLoginSession()
    const userId = user.id

    await addUserStudyTime({ userId, studyTime })

    return NextResponse.json(null, { status: 200 })
  } catch (e) {
    console.log(e)

    return Response.json({}, { status: 400 })
  }
}
