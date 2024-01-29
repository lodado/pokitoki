'use client'

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import React, { useState } from 'react'

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return <NextThemeProvider>{children}</NextThemeProvider>
}

const useSwitchTheme = () => {
  const [isMounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const updateTheme = (newTheme: 'dart' | 'light') => {
    if (isMounted) {
      setTheme(newTheme)
    }
  }

  return { isMounted, theme, updateTheme }
}

export { ThemeProvider, useSwitchTheme }
