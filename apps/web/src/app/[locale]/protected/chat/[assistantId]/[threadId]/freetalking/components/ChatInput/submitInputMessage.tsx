import { SyntheticEvent } from 'react'

import request from '@/api'

export const submitInputMessage = async (assistantId: string, threadId: string, message: string) => {
  const data = await request({
    url: '/api/chatgpt/message',
    method: 'POST',
    data: { assistantId, threadId, message },
  })
}
