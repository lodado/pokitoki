import { ErrorBoundary, useErrorBoundary } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorBoundary> = {
  title: 'example/ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {},
  tags: ['autodocs'],
}

export default meta

const ErrorExample = () => {
  const { setError } = useErrorBoundary()

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

const Fallback = ({ reset }: any) => {
  return <div onClick={reset}>error! reset to click this div</div>
}

export const ErrorBoundaryExample = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <ErrorExample />
    </ErrorBoundary>
  )
}
