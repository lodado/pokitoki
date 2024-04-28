import { SyntheticEvent } from 'react'

import request from '@/api'
import { postAIMessages } from '@/app/api/chatgpt/message/api'

export const submitInputMessage = async (assistantId: string, threadId: string, message: string) => {
  await postAIMessages({ assistantId, threadId, message })
}
