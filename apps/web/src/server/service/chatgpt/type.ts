import type { OpenAI } from 'openai'

export type Assistant = OpenAI.Beta.Assistant
export type Thread = {
  id: string
  assistantId: string
  threadId: string
  createdAt: string
  threadCategory: string
  threadName: string
}
export type Message = OpenAI.Beta.ThreadCreateParams.Message
