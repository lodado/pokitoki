'use client'

import debounce from 'lodash-es/debounce'
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'

import { useAtom, useAtomValue, useSetAtom } from '@/lib'

import {
  chatMessageAtom,
  chatMessageScrollIndexAtom,
  hasChatMoreAtom,
  isChatLoadingAtom,
  triggerRefreshChatContentAtom,
} from '../../../store'

const useInfinityScroll = () => {
  const observerRef = useRef<any>()
  const [isLoading, setLoading] = useAtom(isChatLoadingAtom)
  const [hasMore, setHasMore] = useAtom(hasChatMoreAtom)

  const triggerRefreshChatContent = useSetAtom(triggerRefreshChatContentAtom)

  const previousChatMessageIndex = useAtomValue(chatMessageScrollIndexAtom)

  const lastMessageRef = debounce(() => {
    if (isLoading) return
    if (hasMore) {
      triggerRefreshChatContent()
    }
  }, 500)

  const moveScroll = debounce(() => {
    observerRef.current?.scrollToIndex({ index: previousChatMessageIndex })
  }, 0)

  useEffect(() => {
    moveScroll()
  }, [previousChatMessageIndex])

  return { observerRef, lastMessageRef }
}

export default useInfinityScroll
