import { getUnixTimestamp } from '@custompackages/shared'

import { supabaseInstance } from '@/lib/supabase'

import { Attendance } from './type'

const readUserAttendance = async ({ userId }: Omit<Attendance, 'attendance'>) => {
  const { data, error } = await supabaseInstance.from('attendance').select('*').eq('userId', userId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const upsertUserAttendance = async ({ userId, year, month, day }: Attendance) => {
  const timestamp = getUnixTimestamp({ year, day, month })

  const { data, error } = await supabaseInstance.from('attendance').upsert([{ userId, timestamp }], {
    onConflict: 'timestamp',
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const AttendanceRepository = { readUserAttendance, upsertUserAttendance }

export default AttendanceRepository
