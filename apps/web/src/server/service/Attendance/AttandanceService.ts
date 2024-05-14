import { dayjs, getUnixTimestamp, utc } from '@custompackages/shared'

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

    const twentyFourHoursInSeconds = 24 * 60 * 60 * 1000

    const array = Array.from({ length: Math.min(14 - data.length) }).map((_, index) => {
      const newTimestamp = timestamp - (index + data.length) * twentyFourHoursInSeconds

      return { id: `None${newTimestamp}`, studyTime: 0, timestamp: newTimestamp }
    })

    return [...data, ...array]
  }

  upsertAttendance = async ({ userId, timestamp, studyTime }: Attendance) => {
    const data = await this.attendanceRepository.upsertUserAttendance({ userId, timestamp, studyTime })

    return data
  }

  updateUserStudyTime = async ({
    userId,
    timestamp,
    studyTime,
    offset,
  }: Attendance & { studyTime: number; offset: number }) => {
    const latestData = await this.attendanceRepository.getLatestUserAttendance({ userId, timestamp })

    if (latestData) {
      const latestTimestamp = utc(latestData.timestamp).utcOffset(offset)
      const currentTimestamp = utc(timestamp).utcOffset(offset)

      if (latestTimestamp.isSame(currentTimestamp, 'day')) {
        this.attendanceRepository.updateUserStudyTime({ latestData, studyTime })
        return
      }
    }

    await this.attendanceRepository.upsertUserAttendance({ userId, timestamp, studyTime })
  }
}

const AttendanceServiceInstance = new AttendanceService(AttendanceRepository)

export default AttendanceServiceInstance
