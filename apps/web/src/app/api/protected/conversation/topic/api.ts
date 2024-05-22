import { cache } from 'react'

import request from '@/api'
import { TopicConversation } from '@/server/repository/conversation/topic/type'

export const getConversationTopicList = cache(async () => {
  const response = request<{ topics: TopicConversation[] }>({
    method: 'GET',
    url: '/api/protected/conversation/topic',
    cache: 'force-cache',
  })
  return response
})
