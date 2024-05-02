import { IndexedDBController } from '@custompackages/shared'
import { atom } from 'jotai'

export const getMessageController = () => {
  const storage = new IndexedDBController('pokitoki-storage', 1)

  return storage
}

export const messageControllerAtom = atom(getMessageController())
