import bcrypt from 'bcrypt'
import type { NextAuthConfig, Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { unknown, z } from 'zod'

import jwtMethods from '../jwt/jwtMethods'
import AuthAdapter from './AuthAdapter'

/* 
  AccessToken이 만료되면 refreshToken을 사용해서 다시 받아오는 함수
  TO DO - 
  백엔드에 refresh logic 추가
*/
async function refreshAccessToken(token: any, user: any, nowTime: number) {
  try {
    /* TO DO - refresh logic added
     const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }
    */

    console.log(`refresh ${JSON.stringify(token)}, ${JSON.stringify(user)}`)

    return {
      ...token,
      exp: Math.round(Date.now() / 1000) + 100000,
      // accessToken: refreshedTokens.accessToken,
      // accessTokenExpires: Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
      // refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (err) {
    console.log(`token error: ${err}`)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn(params) {
      const { user, account, profile, email, credentials } = params
      const { findOrCreateUser } = AuthAdapter

      if (account?.provider === 'github') {
        try {
          return await findOrCreateUser({ user, account })
        } catch (e) {
          console.log(e)
          return false
        }
      }

      console.log(`login ${user.id}, ${user.name} ${user.email}`)

      return true
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        return true
      }
      if (isLoggedIn) {
        return true
        // return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },

    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */
    async jwt({ token, account, user }) {
      const nowTime = Math.floor(Date.now() / 1000)
      const isSignIn = !!user

      if (isSignIn && account) {
        console.log('user login', token)

        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
          userId: user.id,
          provider: account.provider ?? 'credentials',
        }
      }

      const shouldRefreshTime = (token.exp as number) - 1 * 60 - nowTime

      console.log('time comp: ', nowTime, token.exp, shouldRefreshTime)

      // 토큰이 만료되지 않았을때는 원래사용하던 토큰을 반환
      if (shouldRefreshTime > 0) {
        return token
      }

      return refreshAccessToken(token, user, nowTime)
    },

    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, token }) {
      const createdSession = {
        user: token.user as User,
        accessToken: token.accessToken,
        error: token.error,
        expires: token.exp,
        provider: token.provider,
      }

      console.log('get session', createdSession)

      return createdSession
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 100000,
  },

  jwt: {
    async encode({ token, secret, maxAge }) {
      return jwtMethods.encode({ token: token as unknown as string, secret, maxAge })
    },
    async decode({ token, secret }) {
      return jwtMethods.decode({ token, secret })
    },
  },

  debug: true,

  adapter: AuthAdapter,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
        const { getUser } = AuthAdapter()

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const user = await getUser(email)
          if (!user) return null
          // const passwordsMatch = await bcrypt.compare(password, user.password)
          const passwordsMatch = password === user.password

          if (passwordsMatch) return user
        }

        console.log(parsedCredentials, 'Invalid credentials')
        return null
      },
    }),
  ],
} as NextAuthConfig
