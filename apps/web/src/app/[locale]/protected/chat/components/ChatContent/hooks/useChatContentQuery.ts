'use client'

import { useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'

import { getAIMessages, getAIMessagesByStorage } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useUrl from '@/hooks/useUrl'
import { useQuery, useQueryClient, useSuspenseQuery } from '@/lib/tanstackQuery'

import { useChatMessageKey } from '../../../hooks'
import { chatMessageAtom, refreshChatContentAtom } from '../../../store'

export interface useChatContentQueryProps {
  isInitFetchAllowed: boolean
}

/**
 * tanstack query가 next14에서 불완전해서 일시적으로 삭제하고, jotai로 구현함
 */
export const useChatContentQuery = ({ isInitFetchAllowed }: { isInitFetchAllowed: boolean }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { threadId, assistantId } = params

  const [chatMessage, setChatMessages] = useAtom(chatMessageAtom)
  const refreshChatContent = useAtomValue(refreshChatContentAtom)

  const [initChatContent] = useState(refreshChatContent)
  useEffect(() => {
    const isFirstLoad = initChatContent === refreshChatContent
    const runRequired = initChatContent !== refreshChatContent

    const requestAiMessages = async () => {
      const { data } = await getAIMessages({
        assistantId,
        threadId,
        isFirstLoad,
        runRequired,
      })

      setChatMessages(data)
    }

    requestAiMessages()
  }, [refreshChatContent])

  useEffect(() => {
    return () => {
      setChatMessages([])
    }
  }, [])

  useEffect(() => {}, [refreshChatContent])

  return { messages: chatMessage }
}
