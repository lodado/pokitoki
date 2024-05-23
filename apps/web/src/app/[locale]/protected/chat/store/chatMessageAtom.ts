import { ChatMessage } from '@/app/api/chatgpt/message/type'
import { atomWithReset } from '@/lib/jotai'

export const chatMessageAtom = atomWithReset<ChatMessage[]>([])

export const isChatLoadingAtom = atomWithReset<boolean>(false)

export const hasChatMoreAtom = atomWithReset<boolean>(true)

export const chatMessageScrollIndexAtom = atomWithReset<number>(0)
