'use client'

import { ComponentProps, Suspense, useEffect, useState } from 'react'

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}

const SSRSafeSuspense = (props: ComponentProps<typeof Suspense>) => {
  const { fallback } = props
  const isMounted = useIsMounted()

  if (isMounted) {
    return <Suspense {...props} />
  }
  return <>{fallback}</>
}

export default SSRSafeSuspense
