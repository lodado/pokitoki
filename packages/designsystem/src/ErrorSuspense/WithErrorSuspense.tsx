/* eslint-disable turbo/no-undeclared-env-vars */
import React, { ComponentType } from 'react'

import ErrorSuspense, { ErrorSuspenseProps } from './ErrorSuspense'

const WithErrorSuspense = <Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  asyncBoundaryProps: ErrorSuspenseProps,
) => {
  const Wrapped = (props: Props) => (
    <ErrorSuspense {...asyncBoundaryProps}>
      <Component {...props} />
    </ErrorSuspense>
  )

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component'
    Wrapped.displayName = `withAsyncBoundary(${name})`
  }

  return Wrapped
}

export default WithErrorSuspense
