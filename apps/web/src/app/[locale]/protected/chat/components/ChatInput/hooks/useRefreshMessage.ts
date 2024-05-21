import React, { SyntheticEvent, useState } from 'react'
import { useFormState } from 'react-dom'

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

const useRefreshMessage = ({ value }: { value: string }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const [isLoading, setLoading] = useState(false)
  const triggerRefreshForAiAnswer = useSetAtom(triggerRefreshForAiAnswerAtom)
  const setChatMessageScrollIndex = useSetAtom(chatMessageScrollIndexAtom)

  const setChatMessages = useSetAtom(chatMessageAtom)

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (isLoading) return

    setLoading(true)

    setChatMessages((oldData: ChatMessage[]) => {
      setChatMessageScrollIndex(oldData.length + 1)

      return [...oldData, { id: 'none', role: 'user', content: value, createdAt: Date.now() }]
    })

    await postAIMessages({ assistantId, threadId, message: value })

    setLoading(false)
    triggerRefreshForAiAnswer()
  }

  return { isLoading, handleSubmitMessage }
}

export default useRefreshMessage
