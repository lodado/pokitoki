/* eslint-disable turbo/no-undeclared-env-vars */
import React, { ComponentType, PropsWithChildren, ReactNode } from 'react'

import SSRSuspense from './SSRSuspense'

const WithSSRSuspense = <Props extends Record<string, unknown> = Record<string, never>>({
  Component,
  fallback,
  Wrapper = ({ children }: PropsWithChildren) => <>{children}</>,
}: {
  Component: ComponentType<Props>
  fallback: NonNullable<React.ReactNode> | null
  Wrapper?: ({ children }: PropsWithChildren) => JSX.Element
}) => {
  const Wrapped = (props: Props) => (
    <Wrapper>
      <SSRSuspense fallback={fallback}>
        <Component {...props} />
      </SSRSuspense>
    </Wrapper>
  )

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component'
    Wrapped.displayName = `withSSRSuspense(${name})`
  }

  return Wrapped
}

export default WithSSRSuspense
