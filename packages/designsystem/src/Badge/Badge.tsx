import { cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

export interface BadgeProps {
  variant: 'yellow'
  className?: string
  children: ReactNode
}

const BadgeStyles = cva('flex min-w-6 w-max h-6 p-1 justify-center items-center space-x-1 flex-shrink-0 detail-01-r', {
  variants: {
    variant: {
      yellow: 'bg-primary-01-default border-2 border-solid border-border-primary-01 text-text-white',
    },
  },
  defaultVariants: {
    variant: 'yellow',
  },
})

const Badge = ({ variant, children, className }: BadgeProps) => {
  return <div className={`${BadgeStyles({ variant })}`}>{children}</div>
}

export default Badge
