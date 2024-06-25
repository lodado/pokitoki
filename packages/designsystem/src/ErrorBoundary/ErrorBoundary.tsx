'use client'

import { useRef } from 'react'

import { BaseErrorBoundary, ErrorBoundaryProps } from './BaseErrorBoundary'

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { children } = props

  return <BaseErrorBoundary {...props}>{children}</BaseErrorBoundary>
}

export default ErrorBoundary
