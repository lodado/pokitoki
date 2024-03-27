'use client'

import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

import { NextAuthSessionResponse } from '@/server/service/auth/SignInParams'

import { LoginSessionProvider } from './nextAuth'
import { useInitTTS } from './voice/tts'

const LibraryClientProvider = ({ children, session }: { children: ReactNode; session: NextAuthSessionResponse }) => {
  useInitTTS()
  return (
    <ThemeProvider>
      <LoginSessionProvider session={session}>{children}</LoginSessionProvider>
    </ThemeProvider>
  )
}

export default LibraryClientProvider
