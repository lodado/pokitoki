'use client'

import { useInterval } from '@custompackages/shared'
import React, { use, useEffect, useState } from 'react'

import { usePageLoading } from '@/hooks/loading'

const PageLoading = () => {
  const { isLoading } = usePageLoading()
  const [textComma, setTextComma] = useState(1)

  useInterval(() => {
    setTextComma((prev) => (prev + 1) % 4)
  }, 300)

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 bg-black-black text-white-white z-loading">
      <div className="text-white">Loading{Array(textComma).fill('.').join('')}</div>
    </div>
  )
}

export default PageLoading
