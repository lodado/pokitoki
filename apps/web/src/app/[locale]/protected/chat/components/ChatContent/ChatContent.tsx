'use client'

import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'

import { getAIMessages } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useQuery } from '@/lib/tanstackQuery'

import { refreshChatContentAtom } from '../../store'

const ChatContent = () => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { threadId, assistantId } = params

  const refreshChatContent = useAtomValue(refreshChatContentAtom)

  const [initChatContent] = useState(refreshChatContent)
  const [isFetchAllowed, setFetchAllowed] = useState(false)

  // Setting up the query for fetching messages
  const {
    data: messages,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(['protected/chat/freetalking', assistantId, threadId], () => getAIMessages({ assistantId, threadId }), {
    enabled: (initChatContent !== refreshChatContent || isFetchAllowed) && !!threadId && !!assistantId,
    select: (data) => data.data,
  })

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

      {!messages ? (
        <p>채팅 내용이 존재하지 않습니다.</p>
      ) : (
        <ul>
          {messages.map((message, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`${message}_${i}`}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ChatContent
