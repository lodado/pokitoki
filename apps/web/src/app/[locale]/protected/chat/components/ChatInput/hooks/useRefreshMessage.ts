import React, { SyntheticEvent } from 'react'
import { useFormState } from 'react-dom'

import { postAIMessages } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useSetAtom } from '@/lib/jotai'
import { useMutation, useQueryClient } from '@/lib/tanstackQuery'

import { triggerRefreshChatContentAtom } from '../../../store'
import { getChatMessageKey } from '../../../utils'

const useRefreshMessage = ({ value }: { value: string }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const queryClient = useQueryClient()
  const chatMessageKey = getChatMessageKey({ threadId, assistantId })

  const { mutate: submitText } = useMutation({
    mutationFn: async () => postAIMessages({ assistantId, threadId, message: value }),

    onSuccess: () => {
      triggerRefreshChatContent()
      queryClient.invalidateQueries(chatMessageKey)
    },
  })

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()
    submitText()
  }

  return { handleSubmitMessage }
}

export default useRefreshMessage
