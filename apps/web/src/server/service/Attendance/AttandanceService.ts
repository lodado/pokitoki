import { dayjs, getUnixTimestamp, utc } from '@custompackages/shared'

import { Attendance, AttendanceRepository, TokenRepository } from '@/server/repository'

import TokenServiceInstance from '../Token/TokenService'

const { addToken } = TokenServiceInstance

class AttendanceService {
  attendanceRepository: typeof AttendanceRepository

  constructor(attendanceRepository: typeof AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  readAttendance = async ({ userId, timestamp }: Attendance) => {
    const data = await this.attendanceRepository.readUserAttendance({ userId, timestamp })

    return data
  }

  readUserAttendanceWithinLast14days = async ({ userId, timestamp, offset }: Attendance & { offset: number }) => {
    const data = await this.attendanceRepository.readUserAttendanceWithinLast14days({ userId, timestamp })

    const twentyFourHoursInSeconds = 24 * 60 * 60 * 1000

    const array = Array.from({ length: 14 }).map((_, index) => {
      const newTimestamp = timestamp - index * twentyFourHoursInSeconds

      return { id: `None${newTimestamp}`, studyTime: 0, timestamp: newTimestamp }
    })

    const groupedData = [...data, ...array].reduce(
      (acc: Record<string, { id: string; date: string; timestamp: number; studyTime: number }>, curr) => {
        const date = utc(curr.timestamp).utcOffset(offset).format('YYYY-MM-DD')

        if (!acc[date]) {
          acc[date] = { date, ...curr }
        }
        acc[date].studyTime += curr.studyTime
        return acc
      },
      {},
    )

    return Object.values(groupedData).sort((a, b) => b.timestamp - a.timestamp)
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

    await this.attendanceRepository.insertUserAttendance({ userId, timestamp, studyTime })
    await addToken({ userId, token: 1000 })
  }
}

const AttendanceServiceInstance = new AttendanceService(AttendanceRepository)

export default AttendanceServiceInstance
