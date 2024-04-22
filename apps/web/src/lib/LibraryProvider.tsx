import React from 'react'

import LibraryClientProvider from './LibraryClientProvider'

const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  return <LibraryClientProvider>{children}</LibraryClientProvider>
}

export default LibraryProvider
