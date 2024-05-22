import { useErrorBoundary } from '@custompackages/designsystem'

import { createThread } from '@/app/api/chatgpt/thread/api'
import { TopicConversation } from '@/server/repository/conversation/topic/type'
import { ChatDialogDescription } from '@/store'

import useUrl from '../useUrl'

const useThreadManager = () => {
  const { locale, push } = useUrl()
  const setError = useErrorBoundary()

  const createThreadByAssistantId = async ({
    assistantId,
    description,
    category,
  }: {
    assistantId: TopicConversation['assistantId']
    description: TopicConversation['description']
    category: ChatDialogDescription['category']
  }) => {
    const { threadId } = await createThread({ assistantId, threadName: description, threadCategory: category })

    return { threadId }
  }

  const enterThread = ({
    assistantId,
    threadId,
  }: {
    assistantId: TopicConversation['assistantId']
    threadId: string
  }) => {
    push(`/${locale}/protected/chat/${assistantId}/${threadId}`)
  }

  const createAndEnterThread = async ({
    assistantId,
    description,
    category,
  }: {
    assistantId: TopicConversation['assistantId']
    description: TopicConversation['description']
    category: ChatDialogDescription['category']
  }) => {
    try {
      const { threadId } = await createThreadByAssistantId({ assistantId, description, category })
      enterThread({ assistantId, threadId })
    } catch (e) {
      console.log(e)
      setError(e)
    }
  }

  return { enterThread, createAndEnterThread }
}

export default useThreadManager
