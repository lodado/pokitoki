import { useErrorBoundary } from '@custompackages/designsystem'
import { noop } from '@custompackages/shared'
import { useState } from 'react'

import { createThread } from '@/app/api/chatgpt/thread/api'
import { isThreadManagerLoadingAtom, usePageLoading, useUrl } from '@/hooks'
import { useAtom, useAtomValue } from '@/lib'
import { ChatInformationDialogProp } from '@/store'

const useThreadManager = ({ state, topic, chatDialogDescription }: ChatInformationDialogProp) => {
  const { locale, push } = useUrl()
  const { isLoading, startLoading, stopLoading } = usePageLoading()
  const setError = useErrorBoundary()

  const { category } = chatDialogDescription
  const { assistantId, threadId: _threadId, description } = topic

  const createThreadByAssistantId = async () => {
    const { threadId } = await createThread({ assistantId, threadName: description!, threadCategory: category! })

    return { threadId }
  }

  const enterThread = ({ threadId }: { threadId?: string }) => {
    push(`/${locale}/protected/chat/${assistantId}/${_threadId ?? threadId}`)
  }

  const createAndEnterThread = async () => {
    try {
      const { threadId } = await createThreadByAssistantId()
      enterThread({ threadId })
    } catch (e) {
      console.log(e)
      setError(e)
    }
  }

  const handleEnterDialog = async () => {
    startLoading()

    if (isLoading) return noop()

    let ReturnFunction

    switch (state) {
      case 'CREATE':
        ReturnFunction = await createThreadByAssistantId()
        break
      case 'ENTER':
        ReturnFunction = enterThread({})
        break
      case 'CREATE_AND_ENTER':
        ReturnFunction = await createAndEnterThread()
        break
      case 'UNMOUNT':
      default:
        ReturnFunction = noop()
    }

    stopLoading()
    return ReturnFunction
  }

  return { handleEnterDialog }
}

export default useThreadManager
