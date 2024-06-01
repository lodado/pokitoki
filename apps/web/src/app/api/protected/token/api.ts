import request from '@/api'
import { Token } from '@/server/repository'

export const getUserToken = async () => {
  const response = request<{ token: Token }>({
    method: 'GET',
    url: '/api/protected/token',
    cache: 'no-cache',
  })
  return response
}
