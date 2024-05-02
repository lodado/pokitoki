import request from '@/api'
import {
  appendMessageStorageById,
  createMessageStorageById,
  getMessageStorageById,
} from '@/app/[locale]/protected/chat/utils/messageStorage'

import { MessageApi } from './type'

// Wrapper for fetching chat details
export const getAIMessages = async ({ assistantId, threadId }: { assistantId: string; threadId: string }) => {
  const cachedData = await getMessageStorageById({ threadId })

  if (cachedData) return cachedData as unknown as { data: string[] }

  const response = await request<MessageApi>({
    method: 'GET',
    url: `/api/chatgpt/message`,
    params: { assistantId, threadId },
  })

  createMessageStorageById({ threadId, data: response.data })

  return response
}

// Wrapper for sending a chat message
export const postAIMessages = async ({
  assistantId,
  threadId,
  message,
}: {
  assistantId: string
  threadId: string
  message: string
}) => {
  const response = await request({
    method: 'POST',
    url: '/api/chatgpt/message',
    data: { assistantId, threadId, message },
  })

  appendMessageStorageById({ threadId, data: [message] })
}
