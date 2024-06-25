import { useErrorBoundary } from '@custompackages/designsystem'
import React, { FormEvent, useRef, useState } from 'react'

import { TOKEN_MESSAGE_COST } from '@/api/constant'
import { postAIMessages } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useToken from '@/hooks/token/useToken'
import useUrl from '@/hooks/useUrl'
import { useAtom, useSetAtom } from '@/lib/jotai'

import { chatMessageAtom, chatMessageScrollIndexAtom, triggerRefreshForAiAnswerAtom } from '../../../store'

const parseFormData = (e: FormEvent<HTMLFormElement>) => {
  const data = Object.fromEntries(new FormData(e.currentTarget))
  const inputValue = data.message as string

  return inputValue
}

const useTokenRefresh = () => {
  const { data, refetch } = useToken()
  const { token } = data

  console.log('token: ', token)

  const isValidTokenAmount = () => {
    if (token - TOKEN_MESSAGE_COST <= 0) {
      alert('beta limit - too many messages in one day. try again next day.')
      return false
    }

    return true
  }

  return { token, refetch, isValidTokenAmount }
}

const useChatMessage = () => {
  const setChatMessageScrollIndex = useSetAtom(chatMessageScrollIndexAtom)
  const setChatMessages = useSetAtom(chatMessageAtom)
  const triggerRefreshForAiAnswer = useSetAtom(triggerRefreshForAiAnswerAtom)

  const addChatMessage = (inputValue: string) => {
    setChatMessages((oldData: ChatMessage[]) => {
      setChatMessageScrollIndex(oldData.length + 1)

      return [...oldData, { id: 'none', role: 'user', content: inputValue, createdAt: Date.now() }]
    })
  }

  const postChatMessage = async ({
    assistantId,
    threadId,
    message: inputValue,
  }: {
    assistantId: string
    threadId: string
    message: string
  }) => {
    addChatMessage(inputValue)
    await postAIMessages({ assistantId, threadId, message: inputValue })
    triggerRefreshForAiAnswer()
  }

  return { postChatMessage }
}

const useRefreshMessage = () => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const [isLoading, setLoading] = useState(false)
  const { setError } = useErrorBoundary()

  const { refetch, isValidTokenAmount } = useTokenRefresh()
  const { postChatMessage } = useChatMessage()

  const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const inputValue = parseFormData(e)

    if (!inputValue) return
    if (!isValidTokenAmount()) return
    if (isLoading) return
    setLoading(true)
    ;(e.target as HTMLFormElement).reset()

    try {
      await postChatMessage({ assistantId, threadId, message: inputValue })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
      refetch()
    }
  }

  return { isLoading, handleSubmitMessage }
}

export default useRefreshMessage
