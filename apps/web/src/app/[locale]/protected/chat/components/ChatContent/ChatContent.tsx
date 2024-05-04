'use client'

import { Virtuoso } from '@custompackages/designsystem'
import { Messages } from 'openai/resources/beta/threads/messages.mjs'
import React, { useEffect, useState } from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'
import { Message } from '@/components/Message'

interface ChatContentProps {
  messages: ChatMessage[]
}

const ChatContent = ({ messages }: ChatContentProps) => {
  // virtuoso 및 server component에 에러가 있는듯?
  const length = messages ? messages.length : 0

  return (
    <div className="w-full h-full">
      <h4>
        <b>채팅 내용</b>
      </h4>

      <ul className="w-full bg-red-100 h-[85vh]">
        <Virtuoso
          // eslint-disable-next-line react/no-unstable-nested-components
          itemContent={(index) => {
            return <Message index={index} message={messages[index]} />
          }}
          totalCount={Math.max(0, length)}
        />
      </ul>
    </div>
  )
}

export default ChatContent
