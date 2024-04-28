'use client'

import React, { SyntheticEvent, useState } from 'react'
import { useFormState } from 'react-dom'

import useUrl from '@/hooks/useUrl'

import { submitInputMessage } from './submitInputMessage'

const ChatInput = () => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { assistantId, threadId } = params
  const [value, setValue] = useState('')

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault()

    await submitInputMessage(assistantId, threadId, value)
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
