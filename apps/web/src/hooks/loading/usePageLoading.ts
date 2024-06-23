import { useAtom } from '@/lib/jotai'

import { isThreadManagerLoadingAtom } from './atom'

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useAtom(isThreadManagerLoadingAtom)

  const startLoading = (): void => {
    setIsLoading(false)
  }

  const stopLoading = (): void => {
    setIsLoading(false)
  }

  return { isLoading, startLoading, stopLoading }
}
