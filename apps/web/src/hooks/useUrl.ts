'use client'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import { MetadataParams } from '@/utils/metadata/metadata'

const useUrl = () => {
  const pathname = usePathname()
  const router = useRouter()
  const query = useSearchParams()
  const params = useParams<MetadataParams['params']>()

  const isSameUrl = (comparedPath: string) => {
    const nextPathWithoutLocale = `./${pathname.split('/').slice(2).join('/')}`

    return comparedPath === nextPathWithoutLocale
  }

  const push = (newPath: string) => {
    router.push(newPath)
  }

  return { isSameUrl, push, query, params }
}

export default useUrl
