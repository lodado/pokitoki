import { cn } from '@custompackages/shared'
import { cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

export interface BadgeProps {
  variant: 'filled' | 'tint' | 'outline'

  color: 'brand'

  className?: string
  children: ReactNode
}

const BadgeStyles = cva(
  'rounded flex min-w-6 w-max h-6 p-1 justify-center items-center space-x-1 flex-shrink-0 body-02-r',
  {
    variants: {
      variant: {
        'filled-brand': 'bg-primary-01-default border border-solid border-border-primary-01 text-text-white',
        'tint-brand': 'bg-primary-02-default border border-solid border-border-primary-02 text-text-primary',
        'outline-brand': 'bg-inherit border border-solid border-border-primary-01 text-text-primary',
      },
    },
    defaultVariants: {
      variant: 'filled-brand',
    },
  },
)

const Badge = ({ variant = 'filled', color = 'brand', children, className }: BadgeProps) => {
  return <div className={cn(BadgeStyles({ variant: `${variant}-${color}` }), className)}>{children}</div>
}

export default Badge
