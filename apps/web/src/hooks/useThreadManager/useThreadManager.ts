import { useErrorBoundary } from '@custompackages/designsystem'
import Error from 'next/error'
import React from 'react'

import { createThread } from '@/app/api/chatgpt/thread/api'
import { TopicConversation } from '@/server/service/conversation/type'

import useUrl from '../useUrl'

const useThreadManager = () => {
  const { locale, push } = useUrl()
  const setError = useErrorBoundary()

  const createThreadByAssistantId = async ({
    assistantId,
    description,
  }: {
    assistantId: TopicConversation['assistantId']
    description: TopicConversation['description']
  }) => {
    const { threadId } = await createThread({ assistantId, threadName: description })

    return { threadId }
  }

  const enterThread = ({
    assistantId,
    threadId,
  }: {
    assistantId: TopicConversation['assistantId']
    threadId: string
  }) => {
    push(`/${locale}/protected/chat/${assistantId}/${threadId}`)
  }

  const createAndEnterThread = async ({
    assistantId,
    description,
  }: {
    assistantId: TopicConversation['assistantId']
    description: TopicConversation['description']
  }) => {
    try {
      const { threadId } = await createThreadByAssistantId({ assistantId, description })
      enterThread({ assistantId, threadId })
    } catch (e) {
      console.log(e)
      setError(e)
    }
  }

  return { enterThread, createAndEnterThread }
}

export default useThreadManager
