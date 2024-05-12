import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import AttendanceServiceInstance from '@/server/service/Attendance/AttandanceService'
import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { readAttendance, upsertAttendance } = AttendanceServiceInstance

export const GET = async (req: NextRequest) => {
  try {
    const year = Number(req.nextUrl.searchParams.get('year'))
    const month = Number(req.nextUrl.searchParams.get('month'))

    const { user } = await getLoginSession()
    const userId = user.id

    const monthAttendanceData = await readAttendance({ userId, year, month })

    return NextResponse.json({ monthAttendanceData })
  } catch (e) {
    console.log('error', e)

    return Response.json({}, { status: 400 })
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const year = Number(req.nextUrl.searchParams.get('year'))
    const month = Number(req.nextUrl.searchParams.get('month'))
    const attendance = Number(req.nextUrl.searchParams.get('attendance'))

    const { user } = await getLoginSession()
    const userId = user.id

    await upsertAttendance({ userId, year, month, attendance })

    return NextResponse.json(null, { status: 200 })
  } catch (e) {
    return Response.json({}, { status: 400 })
  }
}
