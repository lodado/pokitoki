'use client'

import { forwardRef } from 'react'

import { BaseErrorBoundary, ErrorBoundaryProps } from './BaseErrorBoundary'

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return <BaseErrorBoundary {...props} />
}

export default ErrorBoundary
