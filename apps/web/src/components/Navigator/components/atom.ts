import { atom } from '@/lib'

import { LEARNING_STATUS, SELECTIVE_LEARNING } from '../constant'

export const activeTabAtom = atom(
  window.location.pathname.split('/').slice(-1)[0] === 'stat' ? LEARNING_STATUS : SELECTIVE_LEARNING,
)
