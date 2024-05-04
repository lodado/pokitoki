export type ChatMessage = {
  id: string
  createdAt: number
  content: string
}

export interface MessageApi {
  data: ChatMessage[]
}
