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

  const groupedData = data.reduce((acc: Record<string, { id: string; date: string; studyTime: number }>, curr) => {
    const date = utc(curr.timestamp).format('YYYY-MM-DD')
    if (!acc[date]) {
      acc[date] = { date, ...curr }
    }
    acc[date].studyTime += curr.studyTime
    return acc
  }, {})

  const result = Object.values(groupedData)

  console.log(result)

  return result
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

const addUserStudyTime = async ({ userId, timestamp, studyTime }: Attendance & { studyTime: number }) => {
  // 가장 최근의 데이터를 가져옵니다
  const { data, error } = await supabaseInstance
    .from('attendance')
    .select('id, studyTime')
    .eq('userId', userId)
    .order('timestamp', { ascending: false })
    .limit(1)

  if (error) throw new Error(error.message)

  // 데이터가 배열로 반환되므로 첫 번째 요소를 사용합니다
  const latestData = data?.[0]

  // 기존 데이터가 있는 경우
  if (latestData) {
    const newStudyTime = latestData.studyTime + studyTime
    const { id } = latestData

    const { error: updateError } = await supabaseInstance
      .from('attendance')
      .update({ studyTime: newStudyTime })
      .eq('id', id)

    if (updateError) throw new Error(updateError.message)
  }
  // 기존 데이터가 없는 경우
  else {
    const { error: insertError } = await supabaseInstance.from('attendance').insert({ userId, timestamp, studyTime })

    if (insertError) throw new Error(insertError.message)
  }
}
const AttendanceRepository = {
  readUserAttendance,
  readUserAttendanceWithinLast14days,
  upsertUserAttendance,
  addUserStudyTime,
}

export default AttendanceRepository
