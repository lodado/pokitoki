'use client'

import { usePathname } from 'next/navigation'

const useUrl = () => {
  const pathname = usePathname()

  const isSameUrl = (comparedPath: string) => {
    const nextPathWithoutLocale = `./${pathname.split('/').slice(2).join('/')}`

    return comparedPath === nextPathWithoutLocale
  }

  return { isSameUrl }
}

export default useUrl
