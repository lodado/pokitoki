'use client'

import { Virtuoso } from '@custompackages/designsystem'
import React, { useEffect, useState } from 'react'

import { Message } from '@/components/Message'

import { useChatContentQuery } from './hooks'

const ChatContent = () => {
  const [isFetchAllowed, setFetchAllowed] = useState(false)

  const { data: messages, isLoading } = useChatContentQuery({ isFetchAllowed })

  const handleRefresh = () => {
    setFetchAllowed(true)
  }

  return (
    <div>
      <button type="button" onClick={handleRefresh}>
        refresh
      </button>
      <h4>
        <b>채팅 내용</b>
      </h4>

      {isLoading && <div>loading..</div>}

      {messages.length === 0 ? (
        <p>채팅 내용이 존재하지 않습니다.</p>
      ) : (
        <ul className="w-screen h-screen">
          <Virtuoso
            // eslint-disable-next-line react/no-unstable-nested-components
            itemContent={(index) => {
              return <Message index={index} message={messages[index]} />
            }}
            totalCount={Math.max(0, messages.length)}
          />
        </ul>
      )}
    </div>
  )
}

export default ChatContent
