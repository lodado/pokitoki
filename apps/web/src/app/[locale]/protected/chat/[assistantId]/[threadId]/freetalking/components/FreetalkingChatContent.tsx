'use client'

import { ErrorSuspense, RenderFallbackProps } from '@custompackages/designsystem'
import React, { Suspense } from 'react'

import { ChatContent } from '../../../../components/ChatContent'
import { useChatContentQuery } from '../../../../components/ChatContent/hooks'

const RawFreetalkingChatContent = () => {
  const { data: messages } = useChatContentQuery({ isInitFetchAllowed: false })

  return (
    <>
      <ChatContent messages={messages} />
    </>
  )
}

const FreetalkingChatContent = () => {
  return (
    <Suspense key="abc">
      <RawFreetalkingChatContent />
    </Suspense>
  )
}

export default FreetalkingChatContent
