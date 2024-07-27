import { Content as RadixContent, Portal } from '@radix-ui/react-dropdown-menu'
import React, { PropsWithChildren } from 'react'

export interface ContentProps extends PropsWithChildren {}

const Content = ({ children }: ContentProps) => {
  return (
    <Portal>
      <RadixContent className="min-w-[8rem] bg-red-100 rounded-[6px] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity]">
        {children}
      </RadixContent>
    </Portal>
  )
}

export default Content
