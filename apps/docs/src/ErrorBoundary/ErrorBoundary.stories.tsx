import { ErrorBoundary, ErrorSuspense, RenderFallbackProps, useErrorBoundary } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'
import { ReactNode } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorBoundary> = {
  title: 'PokiToki/Navigation',
  component: ErrorBoundary,
  argTypes: {},
  tags: ['autodocs'],
}

export default meta

const ErrorExample = () => {
  const setError = useErrorBoundary()

  return (
    <button
      type="button"
      onClick={() => {
        setError(new Error('error'))
      }}
    >
      create error on click!
    </button>
  )
}

const Fallback = () => <div>error!</div>

export const ErrorBoundaryExample = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <ErrorExample />
    </ErrorBoundary>
  )
}

export const ErrorSuspenseExample = () => {
  return (
    <ErrorSuspense ErrorFallback={Fallback} LoadingFallback={<Fallback />}>
      <ErrorExample />
    </ErrorSuspense>
  )
}
