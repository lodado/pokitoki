import React from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'

export interface MessageProps {
  index: number
  message: ChatMessage
}

const Message = ({ index, message }: MessageProps) => {
  return <li>{message}</li>
}

export default Message
