import React from 'react'

import { JotaiProvider } from './jotai'

const LibraryProvider = async ({ children }: { children: React.ReactNode }) => {
  return <JotaiProvider>{children}</JotaiProvider>
}

export default LibraryProvider
