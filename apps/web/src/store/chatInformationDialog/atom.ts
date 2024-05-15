import { atom } from 'jotai'
import React, { ReactNode } from 'react'

import { TopicConversation } from '@/server/service/conversation/type'

export const doesChatInformationDialogOpenAtom = atom<boolean>(false)

export const chatInformationDialogAtom = atom<TopicConversation | undefined>(undefined)
