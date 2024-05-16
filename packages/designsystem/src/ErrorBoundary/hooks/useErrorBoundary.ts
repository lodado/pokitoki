'use client'

import { useState } from 'react'

type HttpError = {
  message: string
  statusCode: number
}

type CustomError = HttpError | Error | unknown

const useErrorBoundary = <ErrorType extends CustomError>() => {
  const [error, setError] = useState<ErrorType | null>(null)

  if (error != null) {
    throw error
  }

  return setError
}

export default useErrorBoundary
