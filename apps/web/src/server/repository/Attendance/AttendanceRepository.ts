import { dayjs, getUnixTimestamp, utc } from '@custompackages/shared'

import { supabaseInstance } from '@/lib/supabase'

import { Attendance, AttendanceItem } from './type'

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
    .order('pkId', { ascending: false })
    .limit(14)

  if (error) {
    throw new Error(error.message)
  }
  if (!data) return []

  return data
}

const insertUserAttendance = async ({ userId, timestamp, studyTime }: Attendance) => {
  const { data, error } = await supabaseInstance.from('attendance').insert([{ userId, timestamp, studyTime }])
  if (error) {
    throw new Error(error.message)
  }

  return data
}

const getLatestUserAttendance = async ({ userId, timestamp }: Attendance) => {
  // 가장 최근의 데이터를 가져옵니다
  const { data, error } = await supabaseInstance
    .from('attendance')
    .select('id, timestamp, studyTime')
    .eq('userId', userId)
    .order('timestamp', { ascending: false })
    .limit(1)

  if (error) throw new Error(error.message)

  const latestData = data?.[0]

  return latestData
}

const updateUserStudyTime = async ({ latestData, studyTime }: { latestData: any; studyTime: number }) => {
  const newStudyTime = latestData.studyTime + studyTime

  const { id } = latestData

  const { error: updateError } = await supabaseInstance
    .from('attendance')
    .update({ studyTime: newStudyTime })
    .eq('id', id)

  if (updateError) throw new Error(updateError.message)
}

const AttendanceRepository = {
  readUserAttendance,
  readUserAttendanceWithinLast14days,
  insertUserAttendance,
  getLatestUserAttendance,
  updateUserStudyTime,
}

export default AttendanceRepository
