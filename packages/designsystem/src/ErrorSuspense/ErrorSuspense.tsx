'use client'

import { ReactNode, Suspense, SuspenseProps } from 'react'

import { ErrorBoundary, ErrorBoundaryProps } from '../ErrorBoundary'

export interface ErrorSuspenseProps extends Omit<ErrorBoundaryProps, 'fallback'> {
  ErrorFallback: ErrorBoundaryProps['fallback']
  LoadingFallback: JSX.Element

  children: ReactNode
}

const ErrorSuspense = ({ ErrorFallback, LoadingFallback, children, ...errorBoundaryProps }: ErrorSuspenseProps) => {
  return (
    <ErrorBoundary fallback={ErrorFallback} {...errorBoundaryProps}>
      <Suspense fallback={LoadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
export default ErrorSuspense
