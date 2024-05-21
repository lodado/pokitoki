'use client'

import { ICON_INPUT_SUBMIT } from '@custompackages/design-assets'
import { Form, IconButton, Input } from '@custompackages/designsystem'
import React, { SyntheticEvent, useState } from 'react'

import useRefreshMessage from './hooks/useRefreshMessage'

const ChatInput = () => {
  const [value, setValue] = useState('')
  const { isLoading, handleSubmitMessage } = useRefreshMessage({ value })

  return (
    <Form onSubmit={handleSubmitMessage}>
      <Form.Field name="submitInput" className="sticky bottom-0 flex flex-row items-center w-full h-10 gap-2 mb-7 px-7">
        <Form.Control asChild>
          <Input
            id="submitInput"
            className="w-full h-full"
            placeholder="enter your message"
            name="message"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            required
          />
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
