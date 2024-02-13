import React from 'react'

import getLoginSession from '../hooks/login/getLoginSession'
import { JotaiProvider } from './jotai'
import LibraryClientProvider from './LibraryClientProvider'

const LibraryProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getLoginSession()
  if (session?.user)
    session.user = {
      name: session.user.name,
      email: session.user.email,
      picture: session.user.picture,
    } // filter out sensitive data

  return (
    <LibraryClientProvider session={session}>
      <JotaiProvider>{children}</JotaiProvider>
    </LibraryClientProvider>
  )
}

export default LibraryProvider
