'use client'

/* eslint-disable react/no-unused-class-component-methods */
import { Component, ErrorInfo, PropsWithChildren, PropsWithRef, ReactNode } from 'react'

export type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType
  reset: () => void
}
export type IgnoreErrorType = <ErrorType extends Error = Error>(error: ErrorType) => boolean
export type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackProps<ErrorType>,
) => ReactNode | ReactNode

export interface State<ErrorType extends Error = Error> {
  error: ErrorType | null
}

export type ErrorBoundaryProps<ErrorType extends Error = Error> = {
  fallback: RenderFallbackType

  onError?(error: ErrorType, info: ErrorInfo): void
  onReset?(): void
  ignoreError?: IgnoreErrorType

  children: ReactNode
}

const initialState: State = {
  error: null,
}

export class BaseErrorBoundary extends Component<PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>, State> {
  // eslint-disable-next-line react/state-in-constructor
  state: State

  updatedWithError = false

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = initialState
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { error } = this.state

    /* 
    if (error == null) {
    }
   
    if (!this.updatedWithError) {
      this.updatedWithError = true
    }

    추가동작..
    */
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError, ignoreError } = this.props

    if (ignoreError?.(error)) {
      throw error
    }

    onError?.(error, info)
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props

    onReset?.()
    this.resetState()
  }

  resetState() {
    this.updatedWithError = false
    this.setState(initialState)
  }

  render() {
    const { children, fallback } = this.props
    const { error } = this.state

    if (error != null) {
      return fallback({
        error,
        reset: this.resetErrorBoundary,
      })
    }

    return children
  }
}
