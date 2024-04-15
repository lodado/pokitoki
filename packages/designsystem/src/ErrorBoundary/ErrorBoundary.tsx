import { forwardRef } from 'react'

import { BaseErrorBoundary, ErrorBoundaryProps } from './BaseErrorBoundary'

const ErrorBoundary = forwardRef((props: ErrorBoundaryProps) => {
  return <BaseErrorBoundary {...props} />
})

export default ErrorBoundary
