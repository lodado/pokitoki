import React, { ReactNode } from 'react'

import { TooltipContent, TooltipTrigger } from './components/compound'
import { Provider, Root } from './components/radix'

interface TooltipProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean

  onOpenChange?: () => void
}

const Tooltip = ({ children, open, defaultOpen, onOpenChange }: TooltipProps) => {
  return (
    <Provider delayDuration={0}>
      <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </Root>
    </Provider>
  )
}

Tooltip.displayName = 'Tooltip'

Tooltip.Trigger = TooltipTrigger

Tooltip.Content = TooltipContent

export default Tooltip
