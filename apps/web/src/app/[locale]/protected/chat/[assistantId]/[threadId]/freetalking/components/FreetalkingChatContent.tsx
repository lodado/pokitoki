'use client'

import React, { Suspense } from 'react'

import { ChatContent } from '../../../../components/ChatContent'
import { useChatContentQuery } from '../../../../components/ChatContent/hooks'

const FreetalkingChatContent = () => {
  const { messages } = useChatContentQuery({ isInitFetchAllowed: false })

  return <ChatContent messages={messages} />
}

export default FreetalkingChatContent
