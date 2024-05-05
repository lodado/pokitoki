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

  const chatMessageScrollIndex = useAtomValue(chatMessageScrollIndexAtom)

  const lastMessageRef = debounce(() => {
    if (isLoading) return
    if (hasMore) {
      triggerRefreshChatContent()
    }
  }, 500)

  const moveChatContentScroll = debounce(() => {
    observerRef.current?.scrollToIndex({ index: chatMessageScrollIndex })
  }, 0)

  useEffect(() => {
    moveChatContentScroll()
  }, [chatMessageScrollIndex])

  return { observerRef, lastMessageRef }
}

export default useInfinityScroll
