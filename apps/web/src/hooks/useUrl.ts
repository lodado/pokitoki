'use client'

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import { MetadataParams } from '@/utils/metadata/metadata'

const useUrl = <T extends Params = MetadataParams>() => {
  const pathname = usePathname()
  const router = useRouter()
  const query = useSearchParams()
  const params = useParams<T>()

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
