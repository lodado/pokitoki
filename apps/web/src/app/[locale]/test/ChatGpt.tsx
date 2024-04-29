/* eslint-disable no-alert */

'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import request from '@/api'
import type { Assistant, Thread } from '@/server/service/chatgpt/type'
/*
const ChatGpt = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [threads, setThreads] = useState<Thread[]>([])
  const [selectedAssistant, setSelectedAssistant] = useState<{ id: string; name: string }>()

  const tutorNameRef = useRef<HTMLInputElement>(null)
  const tutorInstructionsRef = useRef<HTMLInputElement>(null)
  const chatTitleRef = useRef<HTMLInputElement>(null)

  const handleGetAssistants = async () => {
    const { data } = await request<Assistant[]>({ url: '/api/chatgpt/assistant' })
    if (!data) return

    setAssistants(data)
  }

  const handleInsertAssistant = async () => {
    const data = await request({
      method: 'POST',
      url: '/api/chatgpt/assistant',
      data: {
        name: tutorNameRef.current?.value || '',
        instructions: tutorInstructionsRef.current?.value || '',
      },
    })

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
    const { data } = await request<Thread[]>({ url: `/api/chatgpt/thread?assistantId=${id}` })

    if (!data) return
    setThreads(data)
    setSelectedAssistant({ id, name })
  }

  const handleInsertThread = async () => {
    if (!selectedAssistant) return

    const data = await request<Thread>({
      method: 'POST',
      url: '/api/chatgpt/thread',
      data: { assistantId: selectedAssistant.id, threadName: chatTitleRef.current?.value || '' },
    })

    if (!data || !chatTitleRef.current) return
    chatTitleRef.current.value = ''
    alert(`채팅방이 생성되었습니다.`)
    handleGetThreads(selectedAssistant)
  }

  const handleDeleteThread = async (id: string) => {
    const success = await request({ url: `/api/chatgpt/thread?threadId=${id}`, method: 'DELETE' })

    if (!success || !selectedAssistant) {
      alert('삭제에 실패했습니다. 다시 시도해 주세요.')
      return
    }
    handleGetThreads(selectedAssistant)
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
            {assistants?.map(({ id, name }) => (
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
              <li key={threadId}>
                <Link href={`./test/${threadId}`}>{threadName} 채팅방</Link>{' '}
                <button type="button" onClick={() => handleDeleteThread(threadId)}>
                  [ 삭제 ]
                </button>
              </li>
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
*/
