import { Content as RadixContent,Portal } from '@radix-ui/react-dropdown-menu'
import React, { PropsWithChildren } from 'react'

export interface ContentProps extends PropsWithChildren {}

const Content = ({ children }: ContentProps) => {
  return (
    <Portal>
      <RadixContent>{children}</RadixContent>
    </Portal>
  )
}

export default Content
