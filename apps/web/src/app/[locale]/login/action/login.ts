'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/lib/nextAuth'

import { LOGIN_METHOD } from '../variable'

// eslint-disable-next-line consistent-return
export async function authenticate(prevState: any, formData: FormData) {
  const signupMethod = formData.get(LOGIN_METHOD)

  try {
    await signIn(signupMethod, formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
