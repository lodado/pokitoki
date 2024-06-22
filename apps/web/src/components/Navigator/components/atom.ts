import { atom } from '@/lib'

import { LEARNING_STATUS, SELECTIVE_LEARNING } from '../constant'

const lastPath = window.location.pathname.split('/').slice(-1)[0]

export const activeTabAtom = atom(
  lastPath === 'stat' || lastPath === 'dashboard' ? LEARNING_STATUS : SELECTIVE_LEARNING,
)
