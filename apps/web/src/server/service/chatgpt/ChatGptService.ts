/* eslint-disable no-console */
import { OpenAI } from 'openai'

import { ChatGptRepository } from '@/server/repository'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

class ChatGptService {
  private chatGptRepository: typeof ChatGptRepository

  constructor(chatGptRepository: typeof ChatGptRepository) {
    this.chatGptRepository = chatGptRepository
  }

  // 튜터 생성
  createAssistant = async ({ name, instructions }: { name: string; instructions: string }) => {
    try {
      const { id: assistantId } = await openai.beta.assistants.create({
        name,
        instructions,
        model: 'gpt-3.5-turbo-1106',
        tools: [{ type: 'code_interpreter' }],
      })
      return assistantId
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // 튜터 목록 가져오기
  getAssistants = async () => {
    try {
      const { data: assistants } = await openai.beta.assistants.list()
      return assistants
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // 채팅방 생성 및 실행
  createChat = async (userId: string, assistantId: string, threadName: string) => {
    try {
      const { id: threadId } = await openai.beta.threads.createAndRun({ assistant_id: assistantId })
      const { isSuccess, error } = await this.chatGptRepository.insertThread(userId, assistantId, threadId, threadName)

      if (!isSuccess || error) throw new Error(JSON.stringify(error))
      return threadId
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // 채팅방 목록 가져오기
  getChats = async (userId: string, assistantId: string) => {
    try {
      const threads = await this.chatGptRepository.getThreadIds(userId, assistantId)
      return threads
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // 채팅방 삭제
  deleteChat = async (userId: string, threadId: string) => {
    try {
      const { isSuccess, error } = await this.chatGptRepository.deleteThread(userId, threadId)

      if (!isSuccess || error) throw new Error(JSON.stringify(error))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  // 특정 채팅 데이터 가져오기
  getChatDetail = async (threadId: string) => {
    try {
      const messages = await openai.beta.threads.messages.list(threadId)
      return messages
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // 채팅 보내기
  sendChat = async (threadId: string, prompt: string) => {
    try {
      const { id: messageId } = await openai.beta.threads.messages.create(threadId, { role: 'user', content: prompt })
      return messageId
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

const ChatGptServiceInstance = new ChatGptService(ChatGptRepository)

export default ChatGptServiceInstance
