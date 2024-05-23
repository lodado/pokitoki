import React, { ReactNode } from 'react'

import { atom, atomWithReset } from '@/lib/jotai'
import { TopicConversation } from '@/server/repository/conversation/topic/type'

import { ChatDialogDescription } from './type'

export const doesChatInformationDialogOpenAtom = atom<boolean>(false)

export const chatInformationDialogAtom = atomWithReset<{
  state: 'UNMOUNT' | 'ENTER' | 'CREATE' | 'CREATE_AND_ENTER'
  topic: TopicConversation
  chatDialogDescription: ChatDialogDescription
}>({
  state: 'UNMOUNT',
  topic: {
    id: 0,
    assistantId: '',
    description: '',
    title: '',
  },

  chatDialogDescription: {
    header: '',
    body: '',
    category: '',
  },
})
