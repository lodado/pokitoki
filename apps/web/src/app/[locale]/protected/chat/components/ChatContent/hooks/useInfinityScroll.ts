'use client'

import React, { RefObject, useCallback, useRef, useState } from 'react'

import { useAtom, useSetAtom } from '@/lib'

import { hasChatMoreAtom, isChatLoadingAtom, triggerRefreshChatContentAtom } from '../../../store'

const useInfinityScroll = () => {
  const observerRef = useRef<any>()
  const [isLoading, setLoading] = useAtom(isChatLoadingAtom)
  const [hasMore, setHasMore] = useAtom(hasChatMoreAtom)
  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const lastMessageRef = useCallback(() => {
    console.log('retriggered')

    if (isLoading) return

    if (hasMore) {
      triggerRefreshChatContent()
    }
  }, [isLoading, hasMore])

  return { lastMessageRef }
}

export default useInfinityScroll
