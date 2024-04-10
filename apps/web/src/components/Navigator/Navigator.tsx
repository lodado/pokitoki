import { Navigation } from '@custompackages/designsystem'
import React, { ReactNode } from 'react'

const NavigationLinkButton = ({ children }: { children: ReactNode }) => {
  return (
    <button type="button" className="w-[75px] h-12 pt-1 pb-0.5">
      {children}
    </button>
  )
}

const PokiTokiNavigation = () => {
  return (
    <Navigation className="bottom-0 flex items-center justify-center border border-solid sm:hidden border-border-01 bg-surface-up shadow-profile px-spacing-4">
      <NavigationLinkButton>학습 현황</NavigationLinkButton>

      <NavigationLinkButton>선택 학습</NavigationLinkButton>
    </Navigation>
  )
}

export default PokiTokiNavigation
