'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/lib/nextAuth'

// eslint-disable-next-line consistent-return
export async function authenticate(prevState: any, formData: FormData) {
  try {
    // await signIn('credentials', formData)
    // await signIn('github', formData)
    await signIn('google', formData)
    // await signIn('naver', formData)
    // await signIn('kakao', formData)
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
