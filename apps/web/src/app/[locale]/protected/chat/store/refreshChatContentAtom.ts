import { atom } from 'jotai'

import { atomWithReset } from '@/lib/jotai'

export const refreshChatContentAtom = atomWithReset(0)

export const refreshForAiAnswerAtom = atomWithReset(0)

export const triggerRefreshChatContentAtom = atom(null, (get, set) => {
  set(refreshChatContentAtom, (prev) => prev + 1)
})

export const triggerRefreshForAiAnswerAtom = atom(null, (get, set) => {
  set(refreshForAiAnswerAtom, (prev) => prev + 1)
})
