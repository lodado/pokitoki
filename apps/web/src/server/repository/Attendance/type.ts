export interface Attendance {
  userId: string
  timestamp: number
}

export interface AttendanceItem extends Attendance {
  id: string
  studyTime: number
}
