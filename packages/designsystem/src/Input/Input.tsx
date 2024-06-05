'use client'

import { cn } from '@custompackages/shared'
import { PrimitiveInputProps } from '@radix-ui/react-form'
import React, { forwardRef, HTMLAttributes, InputHTMLAttributes, useEffect, useRef } from 'react'

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

  const testRef = useRef<HTMLInputElement>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleBlur = () => {
      scrollToTop()
    }

    const inputElement = testRef.current
    if (inputElement) {
      inputElement.addEventListener('blur', handleBlur)
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  return <input ref={testRef} className={cn(InputStyleVariants({ variant, size: 'medium' }), className)} {...rest} />
})

export default Input
