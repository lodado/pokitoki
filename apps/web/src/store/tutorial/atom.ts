import { atom, useAtom, useSetAtom } from 'jotai'
import React, { ReactNode, useEffect } from 'react'

// Step 타입 정의
export interface TutorialStep {
  target: string
  content: ReactNode
  locale?: {
    skip: ReactNode
  }
  disableBeacon: boolean
}

// 초기 상태를 빈 배열로 설정하는 atom
export const stepsAtom = atom<TutorialStep[]>([])

// stepsAtom을 설정하는 writeOnlyAtom
export const setStepsAtom = atom(null, (get, set, update: TutorialStep[]) => {
  set(stepsAtom, update)
})
