import { atom } from '@/lib'

import { LEARNING_STATUS, SELECTIVE_LEARNING } from '../constant'

export const activeTabAtom = atom(
  window.location.hostname.split('/').at(-1) === 'selfstudy' ? LEARNING_STATUS : SELECTIVE_LEARNING,
)
