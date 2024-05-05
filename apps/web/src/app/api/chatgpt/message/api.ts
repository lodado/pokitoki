import { getNotNullableObject } from '@custompackages/shared'

import request from '@/api'

import { ChatMessage, MessageApi } from './type'
import { appendMessageStorageById, createMessageStorageById, getMessageStorageById } from './utils/messageStorage'

// Wrapper for fetching chat details

export const getAIMessagesByStorage = async ({ assistantId, threadId }: { assistantId: string; threadId: string }) => {
  const cachedData: { data: ChatMessage[] } = (await getMessageStorageById({ threadId })) ?? { data: [] }

  return cachedData
}

export const getAIMessages = async ({
  assistantId,
  threadId,
  isFirstLoad,
  cursor,
  dataLimit,
  runRequired = false,
}: {
  assistantId: string
  threadId: string
  isFirstLoad: boolean
  dataLimit: number
  cursor?: string
  runRequired?: boolean
}) => {
  const params = getNotNullableObject({ assistantId, threadId, dataLimit, runRequired, cursor })

  const { data } = await request<MessageApi>({
    method: 'GET',
    url: `/api/chatgpt/message`,
    params,
  })

  return { data } as MessageApi
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
  // await appendMessageStorageById({ threadId, data: [message] })

  const response = request({
    method: 'POST',
    url: '/api/chatgpt/message',
    data: { assistantId, threadId, message },
  })
}
