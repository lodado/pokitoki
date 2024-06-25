'use client'

import { useCallback, useState } from 'react'

type HttpError = {
  message: string
  statusCode: number
}

type CustomError = HttpError | Error | unknown

const useErrorBoundary = <ErrorType extends CustomError>() => {
  const [error, setError] = useState<ErrorType | null>(null)

  const reset = useCallback(() => {
    setError(null)
  }, [error])

  if (error != null) {
    throw error
  }

  return { error, setError, reset }
}

export default useErrorBoundary
