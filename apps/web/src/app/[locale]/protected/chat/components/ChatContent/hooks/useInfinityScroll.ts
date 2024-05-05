'use client'

import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'

import { useAtom, useAtomValue, useSetAtom } from '@/lib'

import {
  hasChatMoreAtom,
  isChatLoadingAtom,
  previousChatMessageIndexAtom,
  triggerRefreshChatContentAtom,
} from '../../../store'

const useInfinityScroll = () => {
  const observerRef = useRef<any>()
  const [isLoading, setLoading] = useAtom(isChatLoadingAtom)
  const [hasMore, setHasMore] = useAtom(hasChatMoreAtom)
  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)
  const previousChatMessageIndex = useAtomValue(previousChatMessageIndexAtom)

  const lastMessageRef = () => {
    setTimeout(() => {
      if (isLoading) return

      if (hasMore) {
        triggerRefreshChatContent()
      }
    }, 500)
  }

  useEffect(() => {
    observerRef.current?.scrollToIndex({ index: previousChatMessageIndex })
  }, [previousChatMessageIndex])

  return { observerRef, lastMessageRef }
}

export default useInfinityScroll
