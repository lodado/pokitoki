'use client'

import { WithErrorAndSuspenseProps, WithErrorSuspense } from '@custompackages/designsystem'
import * as Sentry from '@sentry/nextjs'

export interface WithSentryErrorSuspenseProps extends WithErrorAndSuspenseProps {}

const WithSentryErrorSuspense = ({
  Component,
  ErrorBoundaryProps,
  SSRSuspenseProps,
  Wrapper,
}: WithSentryErrorSuspenseProps) => {
  return WithErrorSuspense({
    Component,
    ErrorBoundaryProps: {
      ...ErrorBoundaryProps,
      onError: (error, info) => {
        Sentry.captureException(error)
        ErrorBoundaryProps?.onError?.(error, info)
      },
    },
    SSRSuspenseProps,
    Wrapper,
  })
}

export default WithSentryErrorSuspense
