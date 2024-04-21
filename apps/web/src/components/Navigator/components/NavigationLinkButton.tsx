'use client'

import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

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

export interface NavigationLinkButtonProps extends Partial<LinkProps> {
  href: string
  children: ReactNode
  className?: string
  isCurrentUrl?: string
}

const NavigationLinkButton = ({ children, className, isCurrentUrl, href, ...rest }: NavigationLinkButtonProps) => {
  const { isSameUrl } = useUrl()

  return (
    // @ts-ignore
    <div {...rest}>
      <button
        type="button"
        className={cn(
          IsCurrentPage({ isCurrentUrl: isSameUrl(isCurrentUrl!) }),
          `w-[90px] h-12 color-text-01`,
          className,
        )}
      >
        {children}
      </button>
    </div>
  )
}

export default NavigationLinkButton
