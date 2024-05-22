'use client'

import { useIsMounted } from '@custompackages/shared'
import { ComponentProps, Suspense } from 'react'

const SSRSuspense = (props: ComponentProps<typeof Suspense>) => {
  const { fallback } = props
  const isMounted = useIsMounted()

  if (isMounted) {
    return <Suspense {...props} />
  }
  return <>{fallback}</>
}

export default SSRSuspense
