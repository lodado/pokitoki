import { revalidateTag } from 'next/cache'
import { cache } from 'react'

import request from '@/api'
import { Thread } from '@/server/service/chatgpt/type'

export const getRecentHistoryList = async () => {
  const response = await request<{ topics: Thread[] }>({
    method: 'GET',
    url: '/api/chatgpt/thread/history',
  })
  return response
}
