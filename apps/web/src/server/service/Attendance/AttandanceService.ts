import { dayjs, getUnixTimestamp } from '@custompackages/shared'

import { Attendance, AttendanceRepository } from '@/server/repository'

class AttendanceService {
  attendanceRepository: typeof AttendanceRepository

  constructor(attendanceRepository: typeof AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  readAttendance = async ({ userId, timestamp }: Attendance) => {
    const data = await this.attendanceRepository.readUserAttendance({ userId, timestamp })

    return data
  }

  readUserAttendanceWithinLast14days = async ({ userId, timestamp }: Attendance) => {
    const data = await this.attendanceRepository.readUserAttendanceWithinLast14days({ userId, timestamp })

    const twentyFourHoursInSeconds = 24 * 60 * 60

    const array = Array.from({ length: Math.min(14 - data.length) }).map((_, index) => {
      return { id: 'None', studyTime: 0, timestamp: timestamp - (index + data.length) * twentyFourHoursInSeconds }
    })

    return [...data, ...array]
  }

  upsertAttendance = async ({ userId, timestamp }: Attendance) => {
    const data = await this.attendanceRepository.upsertUserAttendance({ userId, timestamp })

    return data
  }
}

const AttendanceServiceInstance = new AttendanceService(AttendanceRepository)

export default AttendanceServiceInstance
