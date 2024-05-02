'use client'

import React, { SyntheticEvent, useState } from 'react'
import { useFormState } from 'react-dom'

import useUrl from '@/hooks/useUrl'
import { useSetAtom } from '@/lib/jotai'
import { useMutation, useQueryClient } from '@/lib/tanstackQuery'

import { triggerRefreshChatContentAtom } from '../../store'
import { submitInputMessage } from './submitInputMessage'

const ChatInput = () => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params

  const [value, setValue] = useState('')
  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const { mutate: submitText } = useMutation({
    mutationFn: async () => submitInputMessage(assistantId, threadId, value),

    onSuccess: () => {
      /** refresh를 막는 또다른 속성이 필요해서 queryClient.invalidQuery를 사용하지 않음  */
      triggerRefreshChatContent()
    },
  })

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()
    submitText()
  }

  return (
    <form onSubmit={handleSubmitMessage}>
      <input
        name="message"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />

      <button type="submit">채팅 보내기</button>
    </form>
  )
}
export default ChatInput
