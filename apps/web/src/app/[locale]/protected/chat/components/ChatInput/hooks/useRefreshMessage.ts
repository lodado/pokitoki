import React, { SyntheticEvent } from 'react'
import { useFormState } from 'react-dom'

import { postAIMessages } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useSetAtom } from '@/lib/jotai'
import { useMutation, useQueryClient } from '@/lib/tanstackQuery'

import { triggerRefreshChatContentAtom } from '../../../store'

const useRefreshMessage = ({ value }: { value: string }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const query = useQueryClient()

  const { mutate: submitText } = useMutation({
    mutationFn: async () => postAIMessages({ assistantId, threadId, message: value }),

    onSuccess: () => {
      triggerRefreshChatContent()
      query.invalidateQueries(['protected/chat/freetalking', assistantId, threadId])
    },
  })

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()
    submitText()
  }

  return { handleSubmitMessage }
}

export default useRefreshMessage
