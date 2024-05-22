/* eslint-disable no-console */
import { ChatGptRepository } from '@/server/repository'
import { RecentHistoryParams } from '@/server/repository/chatgpt/type'

class ChatGptService {
  private chatGptRepository: typeof ChatGptRepository

  constructor(chatGptRepository: typeof ChatGptRepository) {
    this.chatGptRepository = chatGptRepository
  }

  // 튜터 생성
  createTutor = async ({ name, instructions }: { name: string; instructions: string }) => {
    try {
      const assistantId = await this.chatGptRepository.createAssistant(name, instructions)
      return assistantId
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // 튜터 목록 가져오기
  getTutors = async () => {
    try {
      const assistants = await this.chatGptRepository.getAssistants()
      return assistants
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // 채팅방 생성 및 실행
  createChat = async (userId: string, assistantId: string, threadName: string) => {
    try {
      const threadId = await this.chatGptRepository.createThread(assistantId)
      const { isSuccess, error } = await this.chatGptRepository.insertThread(userId, assistantId, threadId, threadName)

      if (!isSuccess || error) throw new Error(JSON.stringify(error))
      return threadId
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  getThreadRecentHistory = async ({ userId }: RecentHistoryParams) => {
    try {
      const threads = await this.chatGptRepository.getRecentHistory({ userId })
      return threads
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // 채팅방 목록 가져오기
  getChatsByAssistantId = async (userId: string, assistantId: string) => {
    try {
      const threads = await this.chatGptRepository.getThreadsByAssistantId(userId, assistantId)
      return threads
    } catch (err) {
      console.error(err)
      throw err
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
      throw err
    }
  }

  // 특정 채팅 데이터 가져오기
  getChatDetail = async (
    assistantId: string,
    threadId: string,
    dataLimit: number,
    runRequired: boolean,
    cursor?: string,
  ) => {
    try {
      const messages = await this.chatGptRepository.getThreadMessages(
        assistantId,
        threadId,
        dataLimit,
        runRequired,
        cursor,
      )

      return messages.reverse()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // 특정 채팅 데이터 가져오기
  getChatLatestResponse = async (assistantId: string, threadId: string) => {
    try {
      const dataLimit = 1
      const runRequired = true

      const messages = await this.getChatDetail(assistantId, threadId, dataLimit, runRequired)
      return messages.length > 0 ? messages[messages.length - 1] : []
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // 채팅 보내기
  sendChat = async (assistantId: string, threadId: string, prompt: string) => {
    try {
      const messages = await this.chatGptRepository.createThreadMessage(assistantId, threadId, prompt)
      return messages
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

const ChatGptServiceInstance = new ChatGptService(ChatGptRepository)

export default ChatGptServiceInstance
