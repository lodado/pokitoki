import React from 'react'

import LibraryClientProvider from './LibraryClientProvider'
import { ThemeProvider } from './nextTheme'

const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LibraryClientProvider>{children}</LibraryClientProvider>
    </ThemeProvider>
  )
}

export default LibraryProvider
