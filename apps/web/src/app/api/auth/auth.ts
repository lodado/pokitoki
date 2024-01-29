import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { z } from 'zod'

import { authConfig } from './auth.config'

type User = any
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users2 WHERE email=${email}`
    return user.rows[0]
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const {
  handlers: AuthHandlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
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
}) as any
