'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

import { useInitTTS } from './voice/tts'

const LibraryClientProvider = ({ children }: any) => {
  useInitTTS()

  return <ThemeProvider>{children}</ThemeProvider>
}

export default LibraryClientProvider
