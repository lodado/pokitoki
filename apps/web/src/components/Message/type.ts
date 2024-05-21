import { ChatMessage } from '@/app/api/chatgpt/message/type'

export interface MessageProps {
  index: number
  message: ChatMessage
}
