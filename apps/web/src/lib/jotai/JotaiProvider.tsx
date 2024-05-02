import { Provider } from 'jotai'
import { ReactNode } from 'react'

import { getMessageController, messageControllerAtom } from '@/store/message'

import { HydrateAtoms } from './HydrateAtoms'

export interface JotaiProviderProps {
  children: ReactNode
}

export const JotaiProvider = ({ children }: JotaiProviderProps) => {
  return (
    <Provider>
      <HydrateAtoms initialValues={[[messageControllerAtom, getMessageController()]]}>{children}</HydrateAtoms>
    </Provider>
  )
}
