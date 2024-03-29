import bcrypt from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import { z } from 'zod'

import { AuthRepository } from '@/server/repository'
import AuthService from '@/server/service/auth/AuthService'
import { JWT } from '@/server/service/auth/type'

import jwtMethods from '../jwt/jwtMethods'

const { signIn, authorized, jwt, session } = AuthService
export const authConfig = {
  debug: true,

  adapter: AuthRepository,

  pages: {
    signIn: '/login',
  },
  callbacks: { signIn, authorized, jwt, session },

  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, // cookie 수명 - 5일
  },

  jwt: {
    async encode({ token, secret, maxAge }: { token: JWT & JwtPayload; secret: string; maxAge: number }) {
      return jwtMethods.encode({ token, secret, maxAge })
    },
    async decode({ token, secret }: { token: string; secret: string }) {
      return jwtMethods.decode({ token, secret }) as Promise<string>
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),

    /** FIXME
     * 자체 로그인 필요시 사용, 현재는 쓰지 않음
     * */
    Credentials({
      async authorize(credentials) {
        const { getUser } = AuthRepository

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
}
