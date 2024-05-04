import React, { SyntheticEvent } from 'react'
import { useFormState } from 'react-dom'

import { postAIMessages } from '@/app/api/chatgpt/message/api'
import { ChatMessage } from '@/app/api/chatgpt/message/type'
import useUrl from '@/hooks/useUrl'
import { useSetAtom } from '@/lib/jotai'
import { useMutation, useQueryClient } from '@/lib/tanstackQuery'

import { useChatMessageKey } from '../../../hooks'
import { triggerRefreshChatContentAtom } from '../../../store'

const useRefreshMessage = ({ value }: { value: string }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const queryClient = useQueryClient()
  const chatMessageKey = useChatMessageKey({ threadId, assistantId })

  const { mutate: submitText } = useMutation({
    mutationFn: async () => {
      return postAIMessages({ assistantId, threadId, message: value })
    },

    onSuccess: () => {
      triggerRefreshChatContent()
    },
  })

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()

    queryClient.setQueryData(chatMessageKey, ({ data: oldData }: { data: ChatMessage[] }) => {
      return { data: [...oldData, { id: 'none', content: value, createdAt: Date.now() }] }
    })
    submitText()
  }

  return { handleSubmitMessage }
}

export default useRefreshMessage
