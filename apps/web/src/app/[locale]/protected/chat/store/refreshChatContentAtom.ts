import { atom } from 'jotai'

export const refreshChatContentAtom = atom(0)

export const refreshForAiAnswerAtom = atom(0)

export const triggerRefreshChatContentAtom = atom(null, (get, set) => {
  set(refreshChatContentAtom, (prev) => prev + 1)
})

export const triggerRefreshForAiAnswerAtom = atom(null, (get, set) => {
  set(refreshForAiAnswerAtom, (prev) => prev + 1)
})
