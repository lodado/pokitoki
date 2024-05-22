/* eslint-disable no-console */

import ConversationRepository from '@/server/repository/conversation/topic/ConversationRepository'

class ConversationService {
  private conversationRepository: typeof ConversationRepository

  constructor(conversationRepository: typeof ConversationRepository) {
    this.conversationRepository = conversationRepository
  }

  getTopicConversation = async () => {
    try {
      return await this.conversationRepository.getTopicConversations()
    } catch (error) {
      console.log(error)

      throw error
    }
  }
}

const ConversationServiceInstance = new ConversationService(ConversationRepository)

export default ConversationServiceInstance
