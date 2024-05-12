import { Attendance, AttendanceRepository } from '@/server/repository'

class AttendanceService {
  attendanceRepository: typeof AttendanceRepository

  constructor(attendanceRepository: typeof AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  readAttendance = async ({ userId, year, month }: Attendance) => {
    const data = await this.attendanceRepository.readUserAttendance({ userId, year, month })

    return data
  }

  upsertAttendance = async ({ userId, year, month, attendance }: Required<Attendance>) => {
    const data = await this.attendanceRepository.upsertUserAttendance({ userId, year, month, attendance })

    return data
  }
}

const AttendanceServiceInstance = new AttendanceService(AttendanceRepository)

export default AttendanceServiceInstance
