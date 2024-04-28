import request from '@/api'

import { MessageApi } from './type'

// Wrapper for fetching chat details
export const getAIMessages = async ({ assistantId, threadId }: { assistantId: string; threadId: string }) => {
  const response = await request<MessageApi>({
    method: 'GET',
    url: `/api/chatgpt/message`,
    params: { assistantId, threadId },
  })
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
    url: '/api/chatgpt/message', // Adjust this URL to the server route that handles sending chat messages
    data: { assistantId, threadId, message },
  })
}
