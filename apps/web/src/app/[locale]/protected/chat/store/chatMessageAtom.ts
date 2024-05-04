import { atom } from 'jotai'

import { ChatMessage } from '@/app/api/chatgpt/message/type'

export const chatMessageAtom = atom<ChatMessage[]>([])
