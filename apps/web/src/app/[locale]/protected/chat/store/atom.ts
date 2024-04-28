import { atom } from 'jotai'

export const refreshChatContentAtom = atom(0)

export const triggerRefreshChatContentAtom = atom(null, (get, set) => {
  set(refreshChatContentAtom, (prev) => prev + 1)
})
