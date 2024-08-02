import { cn } from '@custompackages/shared'
import { Content as RadixContent, Portal } from '@radix-ui/react-dropdown-menu'
import React, { ComponentProps } from 'react'

export interface ContentProps extends ComponentProps<typeof RadixContent> {}

const Content = ({ children, className, ...rest }: ContentProps) => {
  return (
    <Portal>
      <RadixContent
        className={cn('min-w-[17rem] p-2 flex flex-col rounded-lg shadow-card-01 gap-2 bg-surface-01', className)}
        {...rest}
      >
        {children}
      </RadixContent>
    </Portal>
  )
}

export default Content
