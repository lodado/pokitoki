'use client'

import { Virtuoso } from '@custompackages/designsystem'
import { Messages } from 'openai/resources/beta/threads/messages.mjs'
import React, { useEffect, useState } from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'
import { Message } from '@/components/Message'

import { useInfinityScroll } from './hooks'

interface ChatContentProps {
  messages: ChatMessage[]
}

const ChatContent = ({ messages }: ChatContentProps) => {
  // virtuoso 및 server component에 에러가 있는듯?
  const length = messages ? messages.length : 0
  const { lastMessageRef, observerRef } = useInfinityScroll()

  return (
    <>
      <h4>
        <b>채팅 내용</b>
      </h4>

      <ul className="w-full bg-red-100 h-[85vh]">
        {length > 0 && (
          <Virtuoso
            ref={observerRef}
            // eslint-disable-next-line react/no-unstable-nested-components
            itemContent={(index) => {
              return <Message index={index} message={messages[index]} />
            }}
            totalCount={Math.max(0, length)}
            initialTopMostItemIndex={length - 1}
            rangeChanged={({ startIndex, endIndex }) => {
              if (startIndex <= 3) {
                lastMessageRef()
              }
            }}
          />
        )}
      </ul>
    </>
  )
}

export default ChatContent
