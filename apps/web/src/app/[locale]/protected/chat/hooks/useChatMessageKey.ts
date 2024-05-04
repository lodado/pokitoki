import { useAtomValue } from 'jotai'
import React from 'react'

import { refreshChatContentAtom } from '../store'

export const useChatMessageKey = ({ assistantId, threadId }: { threadId: string; assistantId: string }) => {
  const chatMessageKey = ['protected/chat/freetalking', assistantId, threadId]

  return chatMessageKey
}
