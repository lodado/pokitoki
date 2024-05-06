import { cn } from '@custompackages/shared'
import { PrimitiveInputProps } from '@radix-ui/react-form'
import React, { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react'

import { InputStyleVariants } from './style'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Additional CSS class name */
  className?: string

  /** Whether the input field should be read-only */
  readOnly?: boolean

  /** Whether the input field should be disabled */
  disabled?: boolean

  /** Placeholder text for the input field */
  placeholder?: string

  /** Data attribute indicating whether the input is invalid */
  'data-invalid'?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { className, ...rest } = props

  const dataInvalid = props['data-invalid']
  const variant = dataInvalid ? 'invalid' : 'default'

  return <input className={cn(InputStyleVariants({ variant, size: 'medium' }), className)} {...rest} />
})

export default Input
