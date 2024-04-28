'use client'

import { Button } from '@custompackages/designsystem'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

import request from '@/api'
import useUrl from '@/hooks/useUrl'
import { Thread } from '@/server/service/chatgpt/type'

interface RedirectToFreeTalkingButtonProps {
  children: ReactNode
  className: string
}

const assistantId = 'asst_5ypeuMs1rQIPpRWF6YJwEJ9c'

const RedirectToFreeTalkingButton = ({ className, children }: RedirectToFreeTalkingButtonProps) => {
  const { params, push } = useUrl()
  const { locale } = params

  const handleCreateFreeTalkingThread = async () => {
    try {
      const { threads } = await request<{ threads: Thread[] }>({
        method: 'GET',
        url: '/api/chatgpt/thread',
        params: { assistantId },
      })

      let threadId = threads?.[0]?.threadId

      console.log('TEST!', threadId, threads, !threadId)

      if (!threadId) {
        const b = await request<Thread>({
          method: 'POST',
          url: '/api/chatgpt/thread',
          data: { assistantId, threadName: 'free-talking' },
          timeout: 20000,
        })

        const { threadId: _threadId } = b

        threadId = _threadId
      }

      push(`/${locale}/protected/chat/${assistantId}/${threadId}/freetalking`)
    } catch (error) {
      console.log(error)

      alert('error on create free talking')
    }
  }

  return (
    <Button className={className} size="small" variant="primary" onClick={handleCreateFreeTalkingThread}>
      {children}
    </Button>
  )
}

export default RedirectToFreeTalkingButton
