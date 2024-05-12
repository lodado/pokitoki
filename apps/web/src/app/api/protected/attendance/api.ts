import request from '@/api'
import { Thread } from '@/server/service/chatgpt/type'

// Wrapper for fetching chats
export const getThreadList = async ({ assistantId }: { assistantId: string }) => {
  const response = request<{ threads: Thread[] }>({
    method: 'GET',
    url: '/api/chatgpt/thread',
    params: { assistantId },
  })
  return response
}

export const getThread = async ({ assistantId }: { assistantId: string }) => {
  const { threads } = await getThreadList({ assistantId })
  return threads?.[0]
}

// Wrapper for creating a chat
export const createThread = async ({ assistantId, threadName }: { assistantId: string; threadName: string }) => {
  return request<{ threadId: string }>({
    method: 'POST',
    url: '/api/chatgpt/thread',
    data: { assistantId, threadName },
  })
}

// TO DO - 쓰이면 구현
/* 
export const deleteChat = async (params: { userId: string; threadId: string }) => {
   
}
*/
