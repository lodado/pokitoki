'use client'

import React, { ReactNode } from 'react'

import { JotaiProvider } from './jotai'
import { ReactQueryProvider } from './tanstackQuery'
import { useInitTTS } from './voice/tts'

const LibraryClientProvider = ({ children }: { children: ReactNode }) => {
  useInitTTS()

  return (
    <ReactQueryProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </ReactQueryProvider>
  )
}

export default LibraryClientProvider
