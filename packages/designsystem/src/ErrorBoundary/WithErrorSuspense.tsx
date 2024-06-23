'use client'

import { ComponentType, PropsWithChildren, Suspense, useMemo } from 'react'

import { SSRSuspense, WithSSRSuspense, WithSSRSuspenseProps } from '../SSRSuspense'
import { ErrorBoundaryProps as RawErrorBoundaryProps } from './BaseErrorBoundary'
import ErrorBoundary from './ErrorBoundary'

interface WithErrorAndSuspenseProps {
  Component: ComponentType<Record<string, unknown>>
  ErrorBoundaryProps: Omit<RawErrorBoundaryProps, 'children'>
  SSRSuspenseProps: Omit<WithSSRSuspenseProps, 'Component' | 'Wrapper'>

  Wrapper?: ({ children }: PropsWithChildren) => JSX.Element
}

const WithErrorSuspense = <Props extends Record<string, unknown> = Record<string, never>>({
  Component,
  ErrorBoundaryProps,
  SSRSuspenseProps,
  Wrapper = ({ children }) => <>{children}</>,
}: WithErrorAndSuspenseProps) => {
  const Wrapped = (props: Props) => (
    <Wrapper>
      <SSRSuspense fallback={SSRSuspenseProps.fallback}>
        <ErrorBoundary {...ErrorBoundaryProps}>
          <Component {...props} />
        </ErrorBoundary>
      </SSRSuspense>
    </Wrapper>
  )

  return Wrapped
}

export default WithErrorSuspense
