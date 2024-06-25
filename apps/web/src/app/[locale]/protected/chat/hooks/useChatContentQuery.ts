'use client'

import { useErrorBoundary } from '@custompackages/designsystem'
import React, { useEffect, useRef, useState } from 'react'

import { getAIMessages } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useAtom, useAtomValue, useSetAtom } from '@/lib'
import { useResetAtom } from '@/lib/jotai'

import {
  chatMessageAtom,
  chatMessageScrollIndexAtom,
  hasChatMoreAtom,
  isChatLoadingAtom,
  refreshChatContentAtom,
  refreshForAiAnswerAtom,
} from '../store'

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

  const [isLoading, setLoading] = useAtom(isChatLoadingAtom)
  const { setError } = useErrorBoundary()

  const [chatMessage, setChatMessages] = useAtom(chatMessageAtom)
  const [hasChatMore, setHasChatMore] = useAtom(hasChatMoreAtom)
  const setChatMessageScrollIndex = useSetAtom(chatMessageScrollIndexAtom)

  const [initChatContentCount] = useState(refreshChatContent)
  const [initAiAnswerCount] = useState(refreshForAiAnswer)

  const resetChatContent = useResetAtom(refreshChatContentAtom)
  const resetForAiAnswer = useResetAtom(refreshChatContentAtom)

  /**
   * 무한스크롤로 데이터를 fetch해오는 부분
   */
  useEffect(() => {
    const isFirstLoad = initChatContentCount === refreshChatContent
    const runRequired = false

    const requestAiMessages = async () => {
      setLoading(true)

      const cursor = chatMessage[0]?.id
      const dataLimit = 60

      try {
        const { data } = await getAIMessages({
          assistantId,
          threadId,
          isFirstLoad,
          runRequired,
          cursor,
          dataLimit,
        })

        setChatMessageScrollIndex(data.length)
        setChatMessages((oldData) => [...data, ...oldData])
        setHasChatMore(data.length > 0)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    if (hasChatMore && !isLoading) requestAiMessages()
  }, [refreshChatContent])

  /**
   * ai한테 채팅을 보낸 후, 답장을 받아오는 부분
   */
  useEffect(() => {
    const isFirstLoad = initAiAnswerCount === refreshForAiAnswer
    const runRequired = true

    const requestAiAnswerMessages = async () => {
      setLoading(true)
      const dataLimit = 1

      try {
        const { data } = await getAIMessages({
          assistantId,
          threadId,
          isFirstLoad,
          runRequired,
          dataLimit,
          cursor: undefined,
        })

        const newData = [...chatMessage, ...data]

        setChatMessages(newData)
        setChatMessageScrollIndex(newData.length)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    if (!isFirstLoad) requestAiAnswerMessages()
  }, [refreshForAiAnswer])

  useEffect(() => {
    return () => {
      setChatMessages([])
      resetChatContent()
      resetForAiAnswer()
      setHasChatMore(true)
      setChatMessageScrollIndex(0)
      setLoading(false)
    }
  }, [])

  return { isLoading, messages: chatMessage }
}
