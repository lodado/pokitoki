export interface Attendance {
  userId: string
  timestamp: number
  studyTime?: number
}

export interface AttendanceItem extends Attendance {
  id: string
  studyTime: number
}
