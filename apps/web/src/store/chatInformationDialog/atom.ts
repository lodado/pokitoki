import React, { ReactNode } from 'react'

import { atom, atomWithReset } from '@/lib/jotai'
import { TopicConversation } from '@/server/repository/conversation/topic/type'

import { ChatDialogDescription } from './type'

export const doesChatInformationDialogOpenAtom = atom<boolean>(false)

export const chatInformationDialogAtom = atomWithReset<TopicConversation>({
  id: 0,
  assistantId: '',
  description: '',
  title: '',
})

export const chatDialogDescriptionAtom = atomWithReset<ChatDialogDescription>({
  header: '',
  body: '',
  category: '',
})
