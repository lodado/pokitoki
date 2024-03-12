/* eslint-disable no-alert */

'use client'

import { useEffect, useRef, useState } from 'react'

import type { Assistant, Thread } from '@/server/service/chatgpt/type'

const ChatGpt = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [threads, setThreads] = useState<Thread[]>([])
  const [selectedAssistant, setSelectedAssistant] = useState<{ id: string; name: string }>()

  const tutorNameRef = useRef<HTMLInputElement>(null)
  const tutorInstructionsRef = useRef<HTMLInputElement>(null)
  const chatTitleRef = useRef<HTMLInputElement>(null)

  const handleGetAssistants = async () => {
    const res = await fetch('/api/chatgpt/assistant')
    const data: Assistant[] = await res.json()
    setAssistants(data)
  }

  const handleInsertAssistant = async () => {
    const res = await fetch('/api/chatgpt/assistant', {
      method: 'POST',
      body: JSON.stringify({
        name: tutorNameRef.current?.value || '',
        instructions: tutorInstructionsRef.current?.value || '',
      }),
    })
    const data = await res.json()

    if (!data) {
      alert('에러가 발생했습니다.')
      return
    }

    handleGetAssistants()

    if (!tutorNameRef.current || !tutorInstructionsRef.current) return
    tutorNameRef.current.value = ''
    tutorInstructionsRef.current.value = ''
  }

  const handleGetThreads = async ({ id, name }: { id: string; name: string }) => {
    const res = await fetch(`/api/chatgpt/thread?assistantId=${id}`)
    const data: Thread[] = await res.json()

    if (!data) return
    setThreads(data)
    setSelectedAssistant({ id, name })
  }

  const handleInsertThread = async () => {
    const res = await fetch('/api/chatgpt/thread', {
      method: 'POST',
      body: JSON.stringify({ assistantId: selectedAssistant?.id, threadName: chatTitleRef.current?.value || '' }),
    })
    const { threadId, threadName }: Thread = await res.json()

    if (!threadId || !chatTitleRef.current) return
    chatTitleRef.current.value = ''
    alert(`채팅방이 생성되었습니다.`)
    handleGetThreads({ id: threadId, name: threadName })
  }

  useEffect(() => {
    handleGetAssistants()
  }, [])

  return (
    <div>
      <div>
        <h4>
          <b>튜터 목록(클릭시 채팅방 목록을 볼 수 있습니다.)</b>
        </h4>
        {assistants.length === 0 ? (
          <p>튜터가 존재하지 않습니다.</p>
        ) : (
          <ul>
            {assistants.map(({ id, name }) => (
              <li key={id}>
                <button type="button" onClick={() => handleGetThreads({ id, name: name || '' })}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <br />

      <div>
        <h4>
          <b>튜터 생성</b>
        </h4>
        <ul>
          <li>
            <label htmlFor="name">
              <span>튜터명</span>
              <input id="name" type="text" ref={tutorNameRef} />
            </label>
          </li>
          <li>
            <label htmlFor="name">
              <span>튜터 특징</span>
              <input type="text" ref={tutorInstructionsRef} />
            </label>
          </li>
        </ul>
        <button type="button" onClick={handleInsertAssistant}>
          튜터 생성
        </button>
      </div>

      <br />

      <div>
        <h4>
          <b>채팅방 목록</b>
        </h4>
        {threads.length === 0 ? (
          <p>채팅방이 존재하지 않습니다.</p>
        ) : (
          <ul>
            {threads.map(({ threadId, threadName }) => (
              <li key={threadId}>{threadName} 채팅방</li>
            ))}
          </ul>
        )}
      </div>
      {selectedAssistant && (
        <>
          <br />

          <div>
            <h4>
              <b>선택한 {selectedAssistant.name} 튜터의 채팅방 생성</b>
            </h4>
            <div>
              <ul>
                <li>
                  <label htmlFor="chat_name">
                    <span>채팅방 이름</span>
                    <input id="chat_name" ref={chatTitleRef} />
                  </label>
                </li>
              </ul>
              <button type="button" onClick={handleInsertThread}>
                채팅방 생성
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatGpt
