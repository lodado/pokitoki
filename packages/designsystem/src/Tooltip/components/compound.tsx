'use client'

import { PopperContentProps } from '@radix-ui/react-tooltip'
import React, { HTMLAttributes, ReactComponentElement, ReactNode } from 'react'

import { Arrow, Content, Portal, Provider, Root, Trigger } from './radix'

export const TooltipTrigger = ({ children }: { children: ReactNode }) => {
  return <Trigger asChild>{children}</Trigger>
}

export const TooltipContent = ({
  className,
  children,
  side = 'top',
  align = 'center',
  ...rest
}: {
  className?: string
  children: ReactNode
  side: PopperContentProps['side']
  align: PopperContentProps['align']
} & HTMLAttributes<HTMLDivElement>) => {
  const style = {
    filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))',
    clipPath: 'inset(0 -10px -10px -10px)',
  }

  return (
    <Portal>
      <Content
        className="flex rounded gap-spacing-3 flex-start pt-spacing-1 pb-spacing-2 pl-spacing-3 pr-spacing-3 detail-02-r bg-background-default shadow-tooltip fill-background-default"
        side="top"
        align={align}
        {...rest}
      >
        {children}
        <Arrow style={style} width="12px" height="8px" />
      </Content>
    </Portal>
  )
}
