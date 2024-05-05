'use client'

import React, { useEffect, useRef, useState } from 'react'

import { getAIMessages, getAIMessagesByStorage } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useUrl from '@/hooks/useUrl'
import { useAtom, useAtomValue, useSetAtom } from '@/lib'

import { useChatMessageKey } from '../../../../hooks'
import { chatMessageAtom, hasChatMoreAtom, isChatLoadingAtom, refreshChatContentAtom } from '../../../../store'

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
  const setLoading = useSetAtom(isChatLoadingAtom)
  const setHasChatMore = useSetAtom(hasChatMoreAtom)

  const [initChatContent] = useState(refreshChatContent)
  useEffect(() => {
    const isFirstLoad = initChatContent === refreshChatContent
    const runRequired = false // initChatContent !== refreshChatContent

    const requestAiMessages = async () => {
      setLoading(true)

      const { data } = await getAIMessages({
        assistantId,
        threadId,
        isFirstLoad,
        runRequired,
      })

      setChatMessages(data)
      setLoading(false)
      setHasChatMore(data.length > 0)
    }

    requestAiMessages()
  }, [refreshChatContent])

  useEffect(() => {
    return () => {
      setChatMessages([])
    }
  }, [])

  return { messages: chatMessage }
}
