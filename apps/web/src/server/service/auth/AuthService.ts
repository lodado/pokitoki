import { NextRequest } from 'next/server'
import { CredentialInput } from 'next-auth/providers/credentials'
import { Account, Profile, Session, User } from 'next-auth/types'

import { AuthRepository } from '@/server/repository'

type JWT = any

type SignInParams = {
  user: User
  account: Account | undefined
  profile: Profile | undefined
  email: string | undefined
  credentials: Record<string, CredentialInput> | undefined
}

type AuthorizedParams = {
  auth: Session | null
  request: NextRequest
}

type JWTParams = {
  token: JWT
  account?: Account | null
  user?: User | null
}

type SessionParams = {
  session: Session
  token: JWT
}

const AuthService = () => {
  const { findOrCreateUser } = AuthRepository()
  function refreshAccessToken(token: JWT, user: User, nowTime: number): Promise<JWT> {
    try {
      // Refresh logic here
      return {
        ...token,
        exp: Math.round(Date.now() / 1000) + 100000,
      }
    } catch (err) {
      console.log(`token error: ${err}`)
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      }
    }
  }

  async function signIn({ user, account }: SignInParams): Promise<boolean> {
    if (account?.provider && ['github', 'google'].includes(account.provider)) {
      try {
        return await findOrCreateUser({ user, account })
      } catch (e) {
        console.log(e)
        return false
      }
    }

    console.log(`login ${user.id}, ${user.name} ${user.email}`)

    return true
  }

  function authorized({ auth, request: { nextUrl } }: AuthorizedParams): boolean {
    const isLoggedIn = !!auth?.user
    const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
    return isOnDashboard || isLoggedIn
  }

  async function jwt({ token, account, user }: JWTParams): Promise<JWT> {
    const nowTime = Math.floor(Date.now() / 1000)
    const isSignIn = !!user

    if (isSignIn && account) {
      return {
        ...token,
        accessToken: account.access_token,
        accessTokenExpires: account.expires_at,
        refreshToken: account.refresh_token,
        user,
        userId: user.id,
        provider: account.provider ?? 'credentials',
      }
    }

    const shouldRefreshTime = (token.exp as number) - 1 * 60 - nowTime

    if (shouldRefreshTime > 0) {
      return token
    }

    return refreshAccessToken(token, user!, nowTime)
  }

  async function session({ session: _session, token }: SessionParams): Promise<Session> {
    return {
      ..._session,
      user: token.user as User,
      accessToken: token.accessToken,
      error: token.error,
      expires: token.exp,
      provider: token.provider,
    }
  }

  // Expose the functions
  return {
    signIn,
    authorized,
    jwt,
    session,
  }
}

export default AuthService
