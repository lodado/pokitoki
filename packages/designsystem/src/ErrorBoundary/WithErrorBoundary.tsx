/* eslint-disable turbo/no-undeclared-env-vars */

import React, { ComponentType } from 'react'

import { ErrorBoundaryProps as RawErrorBoundaryProps } from './BaseErrorBoundary'
import ErrorBoundary from './ErrorBoundary'

const WithErrorBoundary = <Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  ErrorBoundaryProps: Omit<RawErrorBoundaryProps, 'children'>,
) => {
  const Wrapped = (props: Props) => (
    <ErrorBoundary {...ErrorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component'
    Wrapped.displayName = `withAsyncBoundary(${name})`
  }

  return Wrapped
}

export default WithErrorBoundary
