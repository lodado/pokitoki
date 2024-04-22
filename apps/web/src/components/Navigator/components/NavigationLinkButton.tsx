'use client'

import React, { HTMLAttributes, ReactNode } from 'react'

import useUrl from '@/hooks/useUrl'
import { cn, cva } from '@/lib/cva'

const IsCurrentPage = cva('w-[75px] h-12 color-text-01', {
  variants: {
    isCurrentUrl: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    isCurrentUrl: false,
  },
})

export interface NavigationLinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  isCurrentUrl?: string
}

const NavigationLinkButton = ({ children, className, isCurrentUrl, ...rest }: NavigationLinkButtonProps) => {
  const { isSameUrl } = useUrl()

  return (
    <button
      type="button"
      className={cn(
        IsCurrentPage({ isCurrentUrl: isSameUrl(isCurrentUrl!) }),
        `w-[90px] h-12 color-text-01`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default NavigationLinkButton
