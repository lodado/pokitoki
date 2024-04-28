'use server'

import request from '@/api'

export const submitInputMessage = async (threadId: string, formData: FormData) => {
  console.log('abcd', threadId, formData)

  const message = formData.get('message')

  const data = await request({
    url: '/api/chatgpt/message',
    method: 'POST',
    data: { threadId, message },
  })
}
