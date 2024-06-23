import { useAtom } from '@/lib/jotai'

import { isThreadManagerLoadingAtom } from './atom'

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useAtom(isThreadManagerLoadingAtom)

  const startLoading = (): void => {
    setIsLoading(true)
  }

  const stopLoading = (): void => {
    setIsLoading(false)
  }

  return { isLoading, startLoading, stopLoading }
}
