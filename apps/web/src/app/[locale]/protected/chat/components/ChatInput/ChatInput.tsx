'use client'

import React, { SyntheticEvent, useState } from 'react'

import useRefreshMessage from './hooks/useRefreshMessage'

const ChatInput = () => {
  const [value, setValue] = useState('')
  const { handleSubmitMessage } = useRefreshMessage({ value })

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
