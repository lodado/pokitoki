export type ChatMessage = {
  role: 'user' | 'assistant'
  id: string
  createdAt: number
  content: string
}

export interface MessageApi {
  data: ChatMessage[]
}
