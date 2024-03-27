import { NextRequest } from 'next/server'
import { CredentialInput } from 'next-auth/providers/credentials'
import { Account, Profile, Session, User } from 'next-auth/types'

export type JWT = {
  user: User
  account: Account
  error?: string

  userId: string
  expiresAt: number
  accessToken: string
  refreshToken?: string // 깃허브는 존재하지 않음
  provider: 'github' | 'kakao' | 'google' | 'naver'
}

export type SignInParams = {
  user: User
  account: Account | undefined
  profile: Profile | undefined
  email: string | undefined
  credentials: Record<string, CredentialInput> | undefined
}

export type AuthorizedParams = {
  auth: Session | null
  request: NextRequest
}

export type JWTParams = {
  token: JWT
  account?: Account | null
  user?: User | null
}

export type SessionParams = {
  session: Session
  token: JWT
}

export type NextAuthSessionResponse = Session & {
  user: User | null
  error?: string
  expiresAt: number
  provider: Account['provider']
}
