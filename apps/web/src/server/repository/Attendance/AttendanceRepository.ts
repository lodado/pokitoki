import { supabaseInstance } from '@/lib/supabase'

import { Attendance } from './type'

const readUserAttendance = async ({ userId, year, month }: Omit<Attendance, 'attendance'>) => {
  const { data, error } = await supabaseInstance
    .from('attendance')
    .select('*')
    .eq('userid', userId)
    .eq('year', year)
    .eq('month', month)

  if (error) {
    throw new Error(error.message)
  }

  if (data.length === 0) {
    return { attendance: 0 }
  }
  return data[0]
}

const upsertUserAttendance = async ({ userId, year, month, attendance }: NonNullable<Attendance>) => {
  const { data, error } = await supabaseInstance
    .from('attendance')
    .upsert([{ userid: userId, year, month, attendance }], {
      onConflict: 'userid,year,month',
    })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const AttendanceRepository = { readUserAttendance, upsertUserAttendance }

export default AttendanceRepository
