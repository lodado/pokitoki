import type { OpenAI } from 'openai'

export type Assistant = OpenAI.Beta.Assistant
export type Thread = { threadId: string; threadName: string }
export type Message = OpenAI.Beta.ThreadCreateParams.Message
