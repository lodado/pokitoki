import { useErrorBoundary } from '@custompackages/designsystem'
import { noop } from '@custompackages/shared'

import { createThread } from '@/app/api/chatgpt/thread/api'
import { useUrl } from '@/hooks'
import { useAtomValue } from '@/lib'
import { chatInformationDialogAtom } from '@/store'

const useThreadManager = () => {
  const { locale, push } = useUrl()
  const setError = useErrorBoundary()
  const chatInformationDialog = useAtomValue(chatInformationDialogAtom)
  const { state, topic, chatDialogDescription } = chatInformationDialog

  const { category } = chatDialogDescription
  const { assistantId, threadId: _threadId, description } = topic

  const createThreadByAssistantId = async () => {
    const { threadId } = await createThread({ assistantId, threadName: description, threadCategory: category })

    return { threadId }
  }

  const enterThread = ({ threadId }: { threadId: string }) => {
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
    switch (state) {
      case 'CREATE':
        return createThreadByAssistantId
      case 'ENTER':
        return enterThread
      case 'CREATE_AND_ENTER':
        return createAndEnterThread
      case 'UNMOUNT':
      default:
        return noop
    }
  }

  return { handleEnterDialog }
}

export default useThreadManager
