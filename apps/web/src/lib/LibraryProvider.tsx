import { ThemeProvider } from 'next-themes'
import React from 'react'

import { JotaiProvider } from './jotai'
import LibraryClientProvider from './LibraryClientProvider'

const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LibraryClientProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </LibraryClientProvider>
  )
}

export default LibraryProvider
