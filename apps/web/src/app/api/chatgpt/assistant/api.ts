import request from '@/api'
import { Assistant } from '@/server/service/chatgpt/type'

export const getAssistantList = async () => {
  const response = request<{ assistants: Assistant[] }>({
    method: 'GET',
    url: '/api/chatgpt/assistant',
  })
  return response
}
