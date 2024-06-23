'use client'

import { WithSSRSuspense } from '@custompackages/designsystem'
import React, { Suspense } from 'react'

import { ChatContent } from '../../../components/ChatContent'
import { ChatInput } from '../../../components/ChatInput'
import { useChatContentQuery } from '../../../hooks'

const RawFreetalkingChatContent = () => {
  const { messages } = useChatContentQuery({ isInitFetchAllowed: false })

  return (
    <>
      <ChatContent messages={messages} />
      <ChatInput />
    </>
  )
}

const FreetalkingChatContent = WithSSRSuspense({
  Wrapper: ({ children }) => <div className="relative flex flex-col flex-1 flex-grow w-full">{children}</div>,
  Component: RawFreetalkingChatContent,
  fallback: <div className="h-full">loading..</div>,
})

export default FreetalkingChatContent
