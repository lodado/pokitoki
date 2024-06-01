import { useErrorBoundary } from '@custompackages/designsystem'
import React, { FormEvent, useRef, useState } from 'react'

import { postAIMessages } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useUrl from '@/hooks/useUrl'
import { useAtom, useSetAtom } from '@/lib/jotai'

import {
  chatMessageAtom,
  chatMessageScrollIndexAtom,
  triggerRefreshChatContentAtom,
  triggerRefreshForAiAnswerAtom,
} from '../../../store'

const parseFormData = (e: FormEvent<HTMLFormElement>) => {
  const data = Object.fromEntries(new FormData(e.currentTarget))
  const inputValue = data.message as string

  return inputValue
}

const useRefreshMessage = () => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const [isLoading, setLoading] = useState(false)
  const setError = useErrorBoundary()

  const triggerRefreshForAiAnswer = useSetAtom(triggerRefreshForAiAnswerAtom)
  const setChatMessageScrollIndex = useSetAtom(chatMessageScrollIndexAtom)

  const setChatMessages = useSetAtom(chatMessageAtom)

  const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return

    try {
      const inputValue = parseFormData(e)
      if (!inputValue) return

      setLoading(true)

      setChatMessages((oldData: ChatMessage[]) => {
        setChatMessageScrollIndex(oldData.length + 1)

        return [...oldData, { id: 'none', role: 'user', content: inputValue, createdAt: Date.now() }]
      })

      await postAIMessages({ assistantId, threadId, message: inputValue })

      setLoading(false)
      triggerRefreshForAiAnswer()
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      setError(error)
    }
  }

  return { isLoading, handleSubmitMessage }
}

export default useRefreshMessage
