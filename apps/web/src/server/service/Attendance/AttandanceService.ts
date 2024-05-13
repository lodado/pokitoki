import { dayjs, getUnixTimestamp } from '@custompackages/shared'

import { Attendance, AttendanceRepository } from '@/server/repository'

class AttendanceService {
  attendanceRepository: typeof AttendanceRepository

  constructor(attendanceRepository: typeof AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  readAttendance = async ({ userId, year, month, day }: Attendance) => {
    const data = await this.attendanceRepository.readUserAttendance({ userId, year, month, day })

    return data
  }

  readUserAttendanceWithinLast14days = async ({ userId, year, month, day }: Attendance) => {
    const data = await this.attendanceRepository.readUserAttendanceWithinLast14days({ userId, year, month, day })
    const timestamp = getUnixTimestamp({ year, day, month })

    const twentyFourHoursInSeconds = 24 * 60 * 60

    const array = Array.from({ length: Math.min(14 - data.length, day) }).map((_, index) => {
      return { id: 'None', studyTime: 0, timestamp: timestamp - (index + data.length) * twentyFourHoursInSeconds }
    })

    return [...data, ...array]
  }

  upsertAttendance = async ({ userId, year, month, day }: Attendance) => {
    const data = await this.attendanceRepository.upsertUserAttendance({ userId, year, month, day })

    return data
  }
}

const AttendanceServiceInstance = new AttendanceService(AttendanceRepository)

export default AttendanceServiceInstance
