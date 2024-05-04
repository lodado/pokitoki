'use client'

import { useAtomValue } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'

import { getAIMessages, getAIMessagesByStorage } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useQuery, useQueryClient, useSuspenseQuery } from '@/lib/tanstackQuery'

import { useChatMessageKey } from '../../../hooks'
import { refreshChatContentAtom } from '../../../store'

export interface useChatContentQueryProps {
  isInitFetchAllowed: boolean
}

export const useChatContentQuery = ({ isInitFetchAllowed }: { isInitFetchAllowed: boolean }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { threadId, assistantId } = params

  const refreshChatContent = useAtomValue(refreshChatContentAtom)
  const [initChatContent] = useState(refreshChatContent)

  const queryClient = useQueryClient()
  const chatMessageKey = useChatMessageKey({ threadId, assistantId })
  const cursorRef = useRef({ cursor: '1' })

  // next14에서 useInfinityQuery가 동작을 안함..;
  const { data, refetch } = useQuery({
    queryKey: chatMessageKey,
    queryFn: () =>
      getAIMessages({
        assistantId,
        threadId,
        isFirstLoad: initChatContent === refreshChatContent,
        runRequired: initChatContent !== refreshChatContent,
      }),

    select: (messages) => messages.data,
  })

  useEffect(() => {
    cursorRef.current.cursor = data?.at(-1)?.id!

    console.log(cursorRef.current.cursor, data)

    refetch()
  }, [refreshChatContent])

  return { data }
}
