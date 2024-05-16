import request from '@/api'
import { Assistant } from '@/server/service/chatgpt/type'

export const getAssistantList = async () => {
  const response = request<{ assistants: Assistant[] }>({
    method: 'GET',
    url: '/api/chatgpt/assistant',
  })
  return response
}

export const createAssistant = async ({ name, instructions }: { name: string; instructions: string }) => {
  const response = request<{ assistants: Assistant[] }>({
    method: 'POST',
    url: '/api/chatgpt/assistant',
    data: { name, instructions },
  })
  return response
}
