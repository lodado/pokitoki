'use client'

import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'

import { useAtom, useSetAtom } from '@/lib'

import { hasChatMoreAtom, isChatLoadingAtom, triggerRefreshChatContentAtom } from '../../../store'

const useInfinityScroll = () => {
  const observerRef = useRef<any>()
  const [isLoading, setLoading] = useAtom(isChatLoadingAtom)
  const [hasMore, setHasMore] = useAtom(hasChatMoreAtom)
  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const lastMessageRef = useCallback(() => {
    if (isLoading) return

    if (hasMore) {
      triggerRefreshChatContent()
    }
  }, [isLoading, hasMore])

  useEffect(() => {}, [isLoading])

  return { observerRef, lastMessageRef }
}

export default useInfinityScroll
