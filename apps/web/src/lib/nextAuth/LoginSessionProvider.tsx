'use client'

import { SessionProvider as NextAuthSessionProvider, signOut } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'

import { NextAuthSessionResponse } from '@/server/service/auth/type'

const LoginSessionProvider = ({ children, session }: { children: ReactNode; session: NextAuthSessionResponse }) => {
  const [sessionRefetchInterval, setSessionRefetchInterval] = useState(10000)

  useEffect(() => {
    if (session?.error) {
      signOut({ callbackUrl: '/login' })
      return
    }

    if (session) {
      const nowTime = Math.round(Date.now() / 1000)
      const timeRemaining = (session.expiresAt as number) - 5 * 60 - nowTime

      setSessionRefetchInterval(timeRemaining > 0 ? timeRemaining : 0)
    }
  }, [session, setSessionRefetchInterval])

  return (
    <NextAuthSessionProvider refetchInterval={sessionRefetchInterval} session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}

export default LoginSessionProvider
