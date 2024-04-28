'use client'

import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

import { JotaiProvider } from './jotai'
import { ReactQueryProvider } from './useQuery'
import { useInitTTS } from './voice/tts'

const LibraryClientProvider = ({ children }: { children: ReactNode }) => {
  useInitTTS()
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}

export default LibraryClientProvider
