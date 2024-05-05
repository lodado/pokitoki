'use client'

import React, { useEffect, useRef, useState } from 'react'

import { getAIMessages, getAIMessagesByStorage } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useUrl from '@/hooks/useUrl'
import { useAtom, useAtomValue, useSetAtom } from '@/lib'

import { useChatMessageKey } from '../../../../hooks'
import {
  chatMessageAtom,
  hasChatMoreAtom,
  isChatLoadingAtom,
  refreshChatContentAtom,
  refreshForAiAnswerAtom,
} from '../../../../store'

export interface useChatContentQueryProps {
  isInitFetchAllowed: boolean
}

/**
 * tanstack query가 next14에서 불완전해서 일시적으로 삭제하고, jotai로 구현함
 */
export const useChatContentQuery = ({ isInitFetchAllowed }: { isInitFetchAllowed: boolean }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { threadId, assistantId } = params

  const refreshChatContent = useAtomValue(refreshChatContentAtom)
  const refreshForAiAnswer = useAtomValue(refreshForAiAnswerAtom)

  const setLoading = useSetAtom(isChatLoadingAtom)

  const [chatMessage, setChatMessages] = useAtom(chatMessageAtom)
  const [hasChatMore, setHasChatMore] = useAtom(hasChatMoreAtom)

  const [initChatContentCount] = useState(refreshChatContent)
  const [initAiAnswerCount] = useState(refreshForAiAnswer)

  useEffect(() => {
    const isFirstLoad = initChatContentCount === refreshChatContent
    const runRequired = false

    const requestAiMessages = async () => {
      setLoading(true)

      const cursor = chatMessage[0]?.id
      const dataLimit = 60

      const { data } = await getAIMessages({
        assistantId,
        threadId,
        isFirstLoad,
        runRequired,
        cursor,
        dataLimit,
      })

      setChatMessages((oldData) => [...oldData, ...data])
      setLoading(false)
      setHasChatMore(data.length > 0)
    }

    if (hasChatMore) requestAiMessages()
  }, [refreshChatContent])

  useEffect(() => {
    const isFirstLoad = initAiAnswerCount === refreshForAiAnswer
    const runRequired = true

    const requestAiAnswerMessages = async () => {
      setLoading(true)

      const dataLimit = 1

      const { data } = await getAIMessages({
        assistantId,
        threadId,
        isFirstLoad,
        runRequired,
        dataLimit,
        cursor: undefined,
      })

      setChatMessages((oldData) => [...oldData, ...data])
      setLoading(false)
    }

    if (!isFirstLoad) requestAiAnswerMessages()
  }, [refreshForAiAnswer])

  useEffect(() => {
    return () => {
      setChatMessages([])
    }
  }, [])

  return { messages: chatMessage }
}
