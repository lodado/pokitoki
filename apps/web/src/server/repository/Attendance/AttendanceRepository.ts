import { dayjs, getUnixTimestamp, utc } from '@custompackages/shared'

import { supabaseInstance } from '@/lib/supabase'

import { Attendance } from './type'

const readUserAttendance = async ({ userId }: Attendance) => {
  const { data, error } = await supabaseInstance.from('attendance').select('*').eq('userId', userId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const readUserAttendanceWithinLast14days = async ({ userId, timestamp }: Attendance) => {
  const firstDayOfMonth = utc(timestamp).startOf('month').unix()
  const fourteenDaysAgo = timestamp

  const { data, error } = await supabaseInstance
    .from('attendance')
    .select('id,studyTime,timestamp')
    .eq('userId', userId)
    .gte('timestamp', firstDayOfMonth) // 이번 달 첫 번째 날 0시 0분 0초 이상
    .lte('timestamp', fourteenDaysAgo) // 현재 시간까지
    .order('timestamp', { ascending: false })
    .limit(14)

  if (error) {
    throw new Error(error.message)
  }
  if (!data) return []

  return data
}

const upsertUserAttendance = async ({ userId, timestamp }: Attendance) => {
  const { data, error } = await supabaseInstance.from('attendance').upsert([{ userId, timestamp }], {
    onConflict: 'timestamp',
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const addUserStudyTime = async ({ userId, studyTime }: { userId: string; studyTime: number }) => {
  const { data, error } = await supabaseInstance
    .from('attendance')
    .select('id,studyTime')
    .eq('userId', userId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single()

  if (error) throw new Error(error.message)
  if (!data) return

  const newStudyTime = data.studyTime + studyTime

  const { id } = data

  const { error: updateError } = await supabaseInstance
    .from('attendance')
    .update({ studyTime: newStudyTime })
    .eq('id', id)

  if (updateError) throw new Error(updateError.message)
}

const AttendanceRepository = {
  readUserAttendance,
  readUserAttendanceWithinLast14days,
  upsertUserAttendance,
  addUserStudyTime,
}

export default AttendanceRepository
