import { Navigation } from '@custompackages/designsystem'
import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

const NavigationLinkButton = ({
  children,
  className,
  ...rest
}: { className?: string; children: ReactNode } & LinkProps) => {
  return (
    <Link href="/" {...rest}>
      <button type="button" className={`w-[75px] h-12 color-text-01 ${className}`}>
        {children}
      </button>
    </Link>
  )
}

const PokiTokiNavigation = () => {
  return (
    <>
      <header className="fixed left-1/2 -translate-x-1/2 w-screen md:w-[768px] justify-between align-middle top-0 shadow-profile bg-surface-up h-12 px-spacing-4 border border-solid border-border-01">
        <nav className="flex justify-between w-full h-full align-middle">
          <NavigationLinkButton href="/">포키토키</NavigationLinkButton>

          <div className="hidden sm:flex">
            <NavigationLinkButton className="pt-1 pb-0.5">학습 현황</NavigationLinkButton>
            <NavigationLinkButton className="pt-1 pb-0.5">선택 학습</NavigationLinkButton>
          </div>

          <div>
            <NavigationLinkButton>프로필</NavigationLinkButton>
          </div>
        </nav>
      </header>

      <Navigation className="bottom-0 flex items-center justify-center border border-solid sm:hidden border-border-01 bg-surface-up shadow-profile px-spacing-4">
        <NavigationLinkButton className="pt-1 pb-0.5">학습 현황</NavigationLinkButton>

        <NavigationLinkButton className="pt-1 pb-0.5">선택 학습</NavigationLinkButton>
      </Navigation>
    </>
  )
}

export default PokiTokiNavigation
