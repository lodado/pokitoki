'use client'

import { Button } from '@custompackages/designsystem'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

import request from '@/api'
import { createThread, getThread } from '@/app/api/chatgpt/thread/api'
import useUrl from '@/hooks/useUrl'
import { Thread } from '@/server/service/chatgpt/type'

interface RedirectToFreeTalkingButtonProps {
  children: ReactNode
  className: string
}

const assistantId = 'asst_5ypeuMs1rQIPpRWF6YJwEJ9c'

const RedirectToFreeTalkingButton = ({ className, children }: RedirectToFreeTalkingButtonProps) => {
  const { params, push } = useUrl<{ locale: string }>()
  const { locale } = params

  const handleCreateFreeTalkingThread = async () => {
    try {
      const thread = await getThread({ assistantId })
      let threadId = thread?.threadId

      if (!threadId) {
        const { threadId: _threadId } = await createThread({ assistantId, threadName: 'free-talking' })

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
