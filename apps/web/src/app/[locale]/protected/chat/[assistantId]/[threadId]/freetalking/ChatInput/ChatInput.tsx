'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom'

import useUrl from '@/hooks/useUrl'

import { submitInputMessage } from './submitInputMessage'

const ChatInput = () => {
  const { params } = useUrl<{ threadId: string }>()
  const { threadId } = params

  const [errorMessage, dispatch] = useFormState(submitInputMessage, threadId)

  const [value, setValue] = useState('')

  return (
    <form action={dispatch}>
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
