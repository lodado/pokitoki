'use client'

import { IndexedDBController, isServerSide } from '@custompackages/shared'

export interface MessageParams {
  threadId: string
}

export const messageController = (!isServerSide() &&
  new IndexedDBController('pokitoki-storage', 1)) as IndexedDBController

export const getMessageStorageById = async ({ threadId }: MessageParams) => {
  return messageController.read({
    id: threadId,
  })
}

export const createMessageStorageById = async ({ threadId, data }: MessageParams & { data: string[] }) => {
  messageController.put({
    id: threadId,
    timestamp: Date.now(),
    data,
  })
}

export const appendMessageStorageById = async ({ threadId, data }: MessageParams & { data: string[] }) => {
  const { data: previousData } = (await getMessageStorageById({ threadId })) ?? { data: [] }

  messageController.put({
    id: threadId,
    timestamp: Date.now(),
    data: [...previousData, ...data],
  })
}
