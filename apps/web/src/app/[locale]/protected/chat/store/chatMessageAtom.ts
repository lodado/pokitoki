import { atom } from 'jotai'

import { ChatMessage } from '@/app/api/chatgpt/message/type'

export const chatMessageAtom = atom<ChatMessage[]>([])

export const isChatLoadingAtom = atom<boolean>(false)

export const hasChatMoreAtom = atom<boolean>(true)

export const chatMessageScrollIndexAtom = atom<number>(0)
