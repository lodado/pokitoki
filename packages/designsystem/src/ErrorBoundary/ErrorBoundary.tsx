'use client'

import { noop } from '@custompackages/shared'
import { useMemo, useRef } from 'react'

import { BaseErrorBoundary, ErrorBoundaryProps } from './BaseErrorBoundary'
import { useErrorGroupBoundaryContext } from './ErrorGroupProvider'

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { children, deps = [], ...rest } = props
  const { refresh } = useErrorGroupBoundaryContext() ?? { refresh: 0 }

  const memoDeps = useMemo(() => [refresh, ...deps], [refresh, ...deps])

  return (
    <BaseErrorBoundary {...rest} deps={memoDeps}>
      {children}
    </BaseErrorBoundary>
  )
}

export default ErrorBoundary
