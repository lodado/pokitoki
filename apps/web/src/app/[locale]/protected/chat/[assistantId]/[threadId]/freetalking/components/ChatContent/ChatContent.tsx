'use client'

import React, { useEffect, useState } from 'react'

import request from '@/api'
import { getAIMessages } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'

const ChatContent = () => {
  const [messages, setMessages] = useState<string[]>([])
  const { params } = useUrl<{ threadId: string; assistantId: string }>()

  // TO DO - react query
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { threadId, assistantId } = params

  const handleGetChatList = async () => {
    try {
      setIsLoading(true)

      const { data } = await getAIMessages({ assistantId, threadId })

      setMessages(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // handleGetChatList()
  }, [])

  return (
    <div>
      <button type="button" onClick={handleGetChatList}>
        refresh
      </button>
      <h4>
        <b>채팅 내용</b>
      </h4>

      {isLoading && <div>loading..</div>}

      {messages.length === 0 ? (
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
