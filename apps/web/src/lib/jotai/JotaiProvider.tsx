import { Provider } from 'jotai'
import { ReactNode } from 'react'

import { HydrateAtoms } from './HydrateAtoms'

export interface JotaiProviderProps {
  children: ReactNode
}

export const JotaiProvider = ({ children }: JotaiProviderProps) => {
  return (
    <Provider>
      <HydrateAtoms initialValues={[]}>{children}</HydrateAtoms>
    </Provider>
  )
}
