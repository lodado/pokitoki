import { useState } from 'react'

const useErrorBoundary = <ErrorType extends Error>() => {
  const [error, setError] = useState<ErrorType | null>(null)

  if (error != null) {
    throw error
  }

  return setError
}

export default useErrorBoundary
