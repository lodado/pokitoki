'use client'

import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

import useUrl from '@/hooks/useUrl'
import { cn, cva } from '@/lib/cva'

const IsCurrentPage = cva('w-[75px] h-12 color-text-01', {
  variants: {
    isCurrentUrl: {
      true: 'border-b-2 border-red-100',
      false: '',
    },
  },
  defaultVariants: {
    isCurrentUrl: false,
  },
})

export interface NavigationLinkButtonProps extends Partial<LinkProps> {
  children: ReactNode
  className?: string
  isCurrentUrl?: string
}

const NavigationLinkButton = ({ children, className, isCurrentUrl, ...rest }: NavigationLinkButtonProps) => {
  const { isSameUrl } = useUrl()

  return (
    <Link href="/" {...rest}>
      <button
        type="button"
        className={cn(
          IsCurrentPage({ isCurrentUrl: isSameUrl(isCurrentUrl!) }),
          `w-[75px] h-12 color-text-01`,
          className,
        )}
      >
        {children}
      </button>
    </Link>
  )
}

export default NavigationLinkButton
