import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import React from 'react'

const LoginSessionProvider = ({ children, session }: any) => {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}

export default LoginSessionProvider
