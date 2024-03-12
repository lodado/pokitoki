/* eslint-disable no-alert */

'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const Chatting = () => {
  const { threadId } = useParams()
  const [messages, setMessages] = useState<string[]>([])
  const messageRef = useRef<HTMLInputElement>(null)

  const handleGetChat = async () => {
    const res = await fetch(`/api/chatgpt/message?threadId=${threadId}`)
    const data: string[] = await res.json()

    if (!data) return
    setMessages(data)
  }

  const handleSendChat = async () => {
    if (!messageRef.current) return

    const res = await fetch('/api/chatgpt/message', {
      method: 'POST',
      body: JSON.stringify({ threadId, message: messageRef.current?.value || '' }),
    })
    const data = await res.json()

    if (!data) {
      alert('에러가 발생했습니다.')
      return
    }

    handleGetChat()
    messageRef.current.value = ''
  }

  useEffect(() => {
    handleGetChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
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

      <br />

      <div>
        <input ref={messageRef} />
        <button type="button" onClick={handleSendChat}>
          채팅 보내기
        </button>
      </div>
    </div>
  )
}

export default Chatting
