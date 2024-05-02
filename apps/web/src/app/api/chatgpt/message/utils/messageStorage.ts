'use client'

import { IndexedDBController, isServerSide } from '@custompackages/shared'

import { ChatMessage } from '../type'

export interface MessageParams {
  threadId: string
}

export const messageController = (!isServerSide() &&
  new IndexedDBController('pokitoki-storage', 1)) as IndexedDBController

export const getMessageStorageById = async <T>({ threadId }: MessageParams) => {
  return messageController.read({
    id: threadId,
  }) as T
}

export const createMessageStorageById = async ({ threadId, data }: MessageParams & { data: ChatMessage[] }) => {
  messageController.put({
    id: threadId,
    timestamp: Date.now(),
    data,
  })
}

export const appendMessageStorageById = async ({ threadId, data }: MessageParams & { data: ChatMessage[] }) => {
  const { data: previousData }: { data: ChatMessage[] } = (await getMessageStorageById({ threadId })) ?? { data: [] }

  await messageController.put({
    id: threadId,
    timestamp: Date.now(),
    data: [...previousData, ...data],
  })
}
