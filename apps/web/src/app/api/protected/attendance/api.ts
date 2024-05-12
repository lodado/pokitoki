import request from '@/api'
import { Attendance } from '@/server/repository'

type AttendanceExceptUserData = Omit<Attendance, 'userId'>

export const getAttendance = async (attendance: AttendanceExceptUserData) => {
  const response = request<Attendance>({
    method: 'GET',
    url: '/api/protected/attendance',
    params: { ...attendance },
  })
  return response
}

export const putAttendance = async (attendance: Required<AttendanceExceptUserData>) => {
  const response = request<Attendance>({
    method: 'PUT',
    url: '/api/protected/attendance',
    params: { ...attendance },
  })
  return response
}
