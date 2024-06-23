'use client'

import { ICON_INPUT_SUBMIT } from '@custompackages/design-assets'
import { ErrorBoundary, Form, IconButton, Input, WithErrorBoundary } from '@custompackages/designsystem'
import React from 'react'

import useRefreshMessage from './hooks/useRefreshMessage'

const ChatInput = () => {
  const { isLoading, handleSubmitMessage } = useRefreshMessage()

  return (
    <Form onSubmit={handleSubmitMessage} onReset={() => {}}>
      <Form.Field
        name="submitInput"
        className="sticky bottom-0 flex flex-row items-center w-full h-10 gap-2 mt-3 mb-7 px-7"
      >
        <Form.Control asChild>
          <Input id="submitInput" className="w-full h-full" placeholder="enter your message" name="message" required />
        </Form.Control>
        <Form.Submit asChild>
          <IconButton size="large" variant="primary" type="submit">
            <ICON_INPUT_SUBMIT />
          </IconButton>
        </Form.Submit>
      </Form.Field>
    </Form>
  )
}
export default ChatInput
