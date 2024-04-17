'use client'

import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

export const NavigationLinkButton = ({
  children,
  className,
  ...rest
}: { className?: string; children: ReactNode } & Partial<LinkProps>) => {
  return (
    <Link href="/" {...rest}>
      <button type="button" className={`border-b-2 border-red-100 w-[75px] h-12 color-text-01 ${className}`}>
        {children}
      </button>
    </Link>
  )
}
