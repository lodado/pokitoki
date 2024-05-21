import React, { ComponentProps, PropsWithChildren } from 'react'

import { Control, Field, Label, Message, Root, Submit, ValidityState } from './components/radix'

const Form = ({ children, ...rest }: ComponentProps<typeof Root>) => {
  return <Root {...rest}>{children}</Root>
}

const RawField = (props: ComponentProps<typeof Field>) => {
  return <Field {...props} />
}

const RawLabel = (props: ComponentProps<typeof Label>) => {
  return <Label {...props} />
}

const RawControl = (props: ComponentProps<typeof Control>) => {
  return <Control asChild {...props} />
}

const RawMessage = (props: ComponentProps<typeof Message>) => {
  return <Message {...props} />
}

const RawSubmit = (props: ComponentProps<typeof Submit>) => {
  return <Submit asChild {...props} />
}

Form.Field = RawField

Form.Label = RawLabel

Form.Message = RawMessage

Form.Submit = RawSubmit

Form.Control = RawControl

export default Form
