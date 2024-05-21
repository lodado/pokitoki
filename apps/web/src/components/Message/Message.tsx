import { ICON_MESSAGE_TOP } from '@custompackages/design-assets'
import React from 'react'

import { AssistantMessage } from './components/AssistantMessage'
import { UserMessage } from './components/UserMessage'
import { MessageProps } from './type'

const MessageMap = {
  assistant: AssistantMessage,
  user: UserMessage,
}

const Message = ({ index, message }: MessageProps) => {
  const MessageComponent = MessageMap[message.role]

  return (
    <div className="relative flex flex-row w-full my-4 h-max detail-02-r text-text-02">
      <MessageComponent index={index} message={message} />
    </div>
  )
}

export default Message
