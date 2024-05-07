'use client'

import { Button } from '@custompackages/designsystem'
import React, { ReactNode } from 'react'

import { DeleteMessageStorageById } from '@/app/api/chatgpt/message/utils/messageStorage'
import { createThread, getThread } from '@/app/api/chatgpt/thread/api'
import useUrl from '@/hooks/useUrl'

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
      const { threadId } = await createThread({ assistantId, threadName: 'free-talking' })

      await DeleteMessageStorageById({ threadId })

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
