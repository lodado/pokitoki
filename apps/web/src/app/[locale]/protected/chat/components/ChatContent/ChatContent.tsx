'use client'

import { Virtuoso } from '@custompackages/designsystem'
import { Messages } from 'openai/resources/beta/threads/messages.mjs'
import React, { useEffect, useState } from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'
import { Message } from '@/components/Message'

import { ChatInput } from '../ChatInput'
import { useInfinityScroll } from './hooks'

interface ChatContentProps {
  messages: ChatMessage[]
}

const ChatContentFooter = () => <div style={{ height: '30px' }} />

const ChatContent = ({ messages }: ChatContentProps) => {
  // virtuoso 및 server component에 에러가 있는듯?
  const length = messages ? messages.length : 0
  const { lastMessageRef, observerRef } = useInfinityScroll()

  return (
    <>
      <div className="relative flex flex-col flex-1 flex-grow w-full">
        {length > 0 ? (
          <Virtuoso
            className="scrollbar-hide"
            ref={observerRef}
            // eslint-disable-next-line react/no-unstable-nested-components
            itemContent={(index) => {
              return <Message index={index} message={messages[index]} />
            }}
            totalCount={Math.max(0, length)}
            initialTopMostItemIndex={length - 1}
            rangeChanged={({ startIndex, endIndex }) => {
              if (startIndex <= 3 && endIndex !== length - 1) {
                lastMessageRef()
              }
            }}
            components={{
              Footer: ChatContentFooter,
            }}
          />
        ) : (
          <div className="flex-1" role="presentation none" />
        )}
      </div>
      <ChatInput />
    </>
  )
}

export default ChatContent
