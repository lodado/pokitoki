import { TopicConversation } from '@/server/repository/conversation/topic/type'

export type ChatDialogDescription = {
  header: string
  body: string
  category?: string
}

export interface ChatInformationDialogProp {
  state: 'UNMOUNT' | 'ENTER' | 'CREATE' | 'CREATE_AND_ENTER'
  topic: TopicConversation
  chatDialogDescription: ChatDialogDescription
}
