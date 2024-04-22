/* eslint-disable camelcase */
import { Provider } from 'next-auth/providers'

import { AuthRepository } from '@/server/repository'

import refreshTokenFactory from './refresh/refreshTokenFactory'
import { AuthorizedParams, JWT, JWTParams, NextAuthSessionResponse, SessionParams, SignInParams } from './type'

class AuthService {
  private authRepository: typeof AuthRepository

  constructor(authRepository: typeof AuthRepository) {
    this.authRepository = authRepository
  }

  refreshAccessToken = async (token: JWT): Promise<JWT> => {
    try {
      const refreshToken = (await refreshTokenFactory(token)) as JWT

      this.authRepository.updateAccount({
        newAccount: {
          refresh_token: refreshToken.refreshToken,
          access_token: refreshToken.accessToken,
          expires_at: refreshToken.expiresAt,
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

  // unused
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
        accessToken: account.access_token!,
        expiresAt: account.expires_at ?? Math.floor(Date.now() / 1000 + (account?.expires_in ?? 60000)),
        refreshToken: account.refresh_token,
        user,
        provider: account.provider as JWT['provider'],
      }
    }

    const shouldRefreshTime = token.expiresAt - 7 * 60 - nowTime

    // console.log(shouldRefreshTime, 'ref', token.provider)

    if (shouldRefreshTime > 0) {
      return token
    }

    return this.refreshAccessToken(token)
  }

  session = async ({ session: _session, token }: SessionParams): Promise<NextAuthSessionResponse> => {
    return {
      ..._session,
      user: token.user,
      error: token.error,
      expiresAt: token.expiresAt,
      provider: token.provider,
    }
  }
}

const AuthServiceInstance = new AuthService(AuthRepository)
export default AuthServiceInstance
