import React from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'

export interface MessageProps {
  index: number
  message: ChatMessage
}

const Message = ({ index, message }: MessageProps) => {
  return (
    <li>
      {message.content}
      <br />
      {message.id}

      <br />
      <br />
    </li>
  )
}

export default Message
