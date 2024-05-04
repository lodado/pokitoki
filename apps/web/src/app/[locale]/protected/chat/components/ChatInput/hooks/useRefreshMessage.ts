import React, { SyntheticEvent } from 'react'
import { useFormState } from 'react-dom'

import { postAIMessages } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useUrl from '@/hooks/useUrl'
import { useAtom, useSetAtom } from '@/lib/jotai'
import { useMutation, useQueryClient } from '@/lib/tanstackQuery'

import { useChatMessageKey } from '../../../hooks'
import { chatMessageAtom, triggerRefreshChatContentAtom } from '../../../store'

const useRefreshMessage = ({ value }: { value: string }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)
  const setChatMessages = useSetAtom(chatMessageAtom)

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()
    setChatMessages((oldData: ChatMessage[]) => {
      return [...oldData, { id: 'none', content: value, createdAt: Date.now() }]
    })

    await postAIMessages({ assistantId, threadId, message: value })

    triggerRefreshChatContent()
  }

  return { handleSubmitMessage }
}

export default useRefreshMessage
