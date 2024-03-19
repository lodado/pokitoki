'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

import { LoginSessionProvider } from './nextAuth'
import { useInitTTS } from './voice/tts'

const LibraryClientProvider = ({ children, session }: any) => {
  useInitTTS()
  return (
    <ThemeProvider>
      <LoginSessionProvider session={session}>{children}</LoginSessionProvider>
    </ThemeProvider>
  )
}

export default LibraryClientProvider
