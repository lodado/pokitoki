export interface TopicConversation {
  id: number
  assistantId: string
  description: string
  title: string
}

export interface ThreadHistory {
  id: number
  threadName: string
  threadCategory: string

  threadId: string
  assistantId: string
  createdAt: string
}
