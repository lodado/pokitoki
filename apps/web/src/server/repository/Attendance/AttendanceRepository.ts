import { getUnixTimestamp } from '@custompackages/shared'

import { supabaseInstance } from '@/lib/supabase'

import { Attendance } from './type'

const readUserAttendance = async ({ userId }: Attendance) => {
  const { data, error } = await supabaseInstance.from('attendance').select('*').eq('userId', userId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const readUserAttendanceWithinLast14days = async ({ userId, year, month, day }: Attendance) => {
  const timestamp = getUnixTimestamp({ year, day, month })

  const { data, error } = await supabaseInstance
    .from('attendance')
    .select('id,studyTime,timestamp')
    .eq('userId', userId)
    .lte('timestamp', timestamp)
    .order('timestamp', { ascending: false })
    .limit(14)

  if (error) {
    throw new Error(error.message)
  }
  if (!data) return []

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

const AttendanceRepository = { readUserAttendance, readUserAttendanceWithinLast14days, upsertUserAttendance }

export default AttendanceRepository
