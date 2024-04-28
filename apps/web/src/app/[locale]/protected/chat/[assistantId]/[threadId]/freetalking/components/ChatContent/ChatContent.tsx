'use client'

import React, { useEffect, useState } from 'react'

import request from '@/api'
import useUrl from '@/hooks/useUrl'

const ChatContent = () => {
  const [messages, setMessages] = useState<string[]>([])
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { threadId, assistantId } = params

  const handleGetChatList = async () => {
    try {
      const { data } = await request<{ data: string[] }>({
        url: `/api/chatgpt/message`,
        params: { assistantId, threadId },
      })

      setMessages(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // handleGetChatList()
  }, [])

  return (
    <div>
      <button type="button" onClick={handleGetChatList}>
        {' '}
        refresh{' '}
      </button>
      <h4>
        <b>채팅 내용</b>
      </h4>

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
