import { useErrorBoundary } from '@custompackages/designsystem'
import React, { FormEvent, useRef, useState } from 'react'

import { TOKEN_MESSAGE_COST } from '@/api/constant'
import { postAIMessages } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useToken from '@/hooks/token/useToken'
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

  const { data, refetch } = useToken()
  const { token } = data

  const [isLoading, setLoading] = useState(false)
  const setError = useErrorBoundary()

  const triggerRefreshForAiAnswer = useSetAtom(triggerRefreshForAiAnswerAtom)
  const setChatMessageScrollIndex = useSetAtom(chatMessageScrollIndexAtom)

  const setChatMessages = useSetAtom(chatMessageAtom)

  console.log('token: ', token)

  const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (token - TOKEN_MESSAGE_COST <= 0) {
      alert('beta limit - too many messages in one day. try again next day.')
    }

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
      refetch()
    } catch (error) {
      setError(error)
    }
  }

  return { isLoading, handleSubmitMessage }
}

export default useRefreshMessage
