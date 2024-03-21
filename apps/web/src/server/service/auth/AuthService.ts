import { NextRequest } from 'next/server'
import { CredentialInput } from 'next-auth/providers/credentials'
import { Account, Profile, Session, User } from 'next-auth/types'

import { AuthRepository } from '@/server/repository'

import refreshTokenFactory from './refresh/refreshTokenFactory'

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

class AuthService {
  private authRepository: typeof AuthRepository

  constructor(authRepository: typeof AuthRepository) {
    this.authRepository = authRepository
  }

  refreshAccessToken = async (token: JWT, user: User, nowTime: number): Promise<JWT> => {
    try {
      const refreshToken = await refreshTokenFactory(token)

      this.authRepository.updateAccount({
        newAccount: {
          ...token.account,
          refresh_token: refreshToken.refreshToken,
          access_token: refreshToken.accessToken,
          expires_at: refreshToken.expires_at,
        },
      })

      return refreshToken
    } catch (err) {
      console.log(`token error: ${JSON.stringify(err)}`)
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      }
    }
  }

  signIn = async ({ user, account }: SignInParams): Promise<boolean> => {
    if (account?.provider && ['github', 'google', 'naver', 'kakao'].includes(account.provider)) {
      try {
        return await this.authRepository.findOrCreateUser({ user, account })
      } catch (e) {
        console.log(e)
        return false
      }
    }

    // console.log(`login ${user.id}, ${user.name} ${user.email}`)
    return true
  }

  authorized = ({ auth, request: { nextUrl } }: AuthorizedParams): boolean => {
    const isLoggedIn = !!auth?.user
    const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
    return isOnDashboard || isLoggedIn
  }

  jwt = async ({ token, account, user }: JWTParams): Promise<JWT> => {
    const nowTime = Math.floor(Date.now() / 1000)
    const isSignIn = !!user

    if (isSignIn && account) {
      return {
        ...token,
        accessToken: account.access_token,
        expires_at: account.expires_at ?? Math.floor(Date.now() / 1000 + (account?.expires_in ?? 60000)),
        refreshToken: account.refresh_token,
        user,
        userId: user.id,
        provider: account.provider,
        account,
      }
    }

    const shouldRefreshTime = (token.expires_at as number) - 7 * 60 - nowTime

    // console.log(shouldRefreshTime, 'ref', token.provider)

    if (shouldRefreshTime > 0) {
      return token
    }

    return this.refreshAccessToken(token, user!, nowTime)
  }

  session = async ({ session: _session, token }: SessionParams) => {
    return {
      ..._session,
      user: token.user as User,
      accessToken: token.accessToken,
      error: token.error,
      expires_at: token.expires_at,
      provider: token.provider,
    }
  }
}

const AuthServiceInstance = new AuthService(AuthRepository)

export default AuthServiceInstance
