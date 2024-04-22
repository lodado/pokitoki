'use client'

import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

import { JotaiProvider } from './jotai'
import { useInitTTS } from './voice/tts'

const LibraryClientProvider = ({ children }: { children: ReactNode }) => {
  useInitTTS()
  return (
    <ThemeProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </ThemeProvider>
  )
}

export default LibraryClientProvider
