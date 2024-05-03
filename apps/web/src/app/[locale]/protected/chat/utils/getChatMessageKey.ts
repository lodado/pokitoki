import React from 'react'

export const getChatMessageKey = ({ assistantId, threadId }: { threadId: string; assistantId: string }) => {
  const chatMessageKey = ['protected/chat/freetalking', assistantId, threadId]

  return chatMessageKey
}
