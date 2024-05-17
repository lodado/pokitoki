import React, { ReactNode } from 'react'

import { atom, atomWithReset } from '@/lib/jotai'

// 초기 상태를 빈 배열로 설정하는 atom
export const studyTimeAtom = atomWithReset<number>(0)
