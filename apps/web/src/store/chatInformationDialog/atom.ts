import React, { ReactNode } from 'react'

import { atom, atomWithReset } from '@/lib/jotai'

import { ChatInformationDialogProp } from './type'

export const doesChatInformationDialogOpenAtom = atom<boolean>(false)

export const chatInformationDialogAtom = atomWithReset<ChatInformationDialogProp>({
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
