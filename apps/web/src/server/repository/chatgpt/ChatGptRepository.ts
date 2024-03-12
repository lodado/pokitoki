import { supabaseInstance } from '@/lib/supabase'

// 사용자별 해당 튜터의 스레드(채팅방) 정보를 가져옴
export const getThreadIds = async (userId: string, assistantId: string) => {
  const { data: threadIds } = await supabaseInstance
    .from('threads')
    .select('threadId, threadName')
    .eq('userId', userId)
    .eq('assistantId', assistantId)
  return threadIds
}

// 사용자별 해당 튜터의 스레드(채팅방) 정보를 저장
export const insertThread = async (userId: string, assistantId: string, threadId: string) => {
  const { error } = await supabaseInstance.from('threads').insert({ userId, assistantId, threadId } as never)

  return { isSuccess: !error, error }
}

// 사용자별 해당 튜터의 스레드(채팅방) 정보를 제거
export const deleteThread = async (userId: string, threadId: string) => {
  const { error } = await supabaseInstance.from('user_threads').delete().eq('userId', userId).eq('threadId', threadId)

  return { isSuccess: !error, error }
}

export default { getThreadIds, insertThread, deleteThread }
