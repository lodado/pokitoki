import React from 'react'

import { getLoginSession } from '@/hooks/login'

import LibraryClientProvider from './LibraryClientProvider'
import { LoginSessionProvider } from './nextAuth'
import { ThemeProvider } from './nextTheme'

const LibraryProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getLoginSession()

  return (
    <LoginSessionProvider session={session}>
      <ThemeProvider>
        <LibraryClientProvider>{children}</LibraryClientProvider>
      </ThemeProvider>
    </LoginSessionProvider>
  )
}

export default LibraryProvider
