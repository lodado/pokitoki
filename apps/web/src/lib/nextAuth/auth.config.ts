import bcrypt from 'bcrypt'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { z } from 'zod'

import { AuthRepository } from '@/server/repository'
import AuthService from '@/server/service/auth/AuthService'

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

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
} as NextAuthConfig
