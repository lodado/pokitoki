'use client'

import React from 'react'

import { WithSentryErrorSuspense } from '@/components'

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

const FreetalkingChatContent = WithSentryErrorSuspense({
  Wrapper: ({ children }) => <div className="relative flex flex-col flex-1 flex-grow w-full">{children}</div>,
  Component: RawFreetalkingChatContent,
  ErrorBoundaryProps: {
    fallback: () => <div>Error occurred</div>,
  },
  SSRSuspenseProps: {
    fallback: <div className="h-full">loading..</div>,
  },
})

export default FreetalkingChatContent
