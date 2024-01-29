import NextAuth, { DefaultSession, User } from 'next-auth'
import { unknown } from 'zod'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User
    accessToken: string
    error: unknown
  }
}
