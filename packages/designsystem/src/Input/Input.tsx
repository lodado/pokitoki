import { cn } from '@custompackages/shared'
import { PrimitiveInputProps } from '@radix-ui/react-form'
import React, { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react'

import { InputStyleVariants } from './style'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  'data-invalid'?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { className, ...rest } = props

  return <input className={cn(InputStyleVariants({ variant: 'default', size: 'medium' }), className)} {...rest} />
})

export default Input
