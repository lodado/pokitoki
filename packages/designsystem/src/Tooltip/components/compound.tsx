import { PopperContentProps } from '@radix-ui/react-tooltip'
import React, { ReactNode } from 'react'

import { Arrow, Content, Portal, Provider, Root, Trigger } from './radix'

export const TooltipTrigger = ({ children }: { children: ReactNode }) => {
  return <Trigger asChild>{children}</Trigger>
}

export const TooltipContent = ({
  children,
  side = 'top',
  align = 'center',
}: {
  children: ReactNode
  side: PopperContentProps['side']
  align: PopperContentProps['align']
}) => {
  return (
    <Portal>
      <Content side={side} align={align}>
        {children}
        <Arrow width={11} height={5} />
      </Content>
    </Portal>
  )
}
