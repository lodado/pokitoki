'use client'

import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'

import { getAIMessages, getAIMessagesByStorage } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useQuery, useQueryClient, useSuspenseQuery } from '@/lib/tanstackQuery'

import { refreshChatContentAtom } from '../../../store'
import { getChatMessageKey } from '../../../utils'

export interface useChatContentQueryProps {
  isInitFetchAllowed: boolean
}

export const useChatContentQuery = ({ isInitFetchAllowed }: { isInitFetchAllowed: boolean }) => {
  const { params } = useUrl<{ threadId: string; assistantId: string }>()
  const { threadId, assistantId } = params

  const refreshChatContent = useAtomValue(refreshChatContentAtom)
  const [initChatContent] = useState(refreshChatContent)

  const queryClient = useQueryClient()
  const chatMessageKey = getChatMessageKey({ threadId, assistantId })

  /**
   *  onSuccess: async (cachedMessages: string[]) => {
      const updatedData = await getAIMessages({
        assistantId,
        threadId,
        isFirstLoad: initChatContent === refreshChatContent,
        runRequired: initChatContent !== refreshChatContent,
        cachedData: cachedMessages,
      })

      queryClient.setQueryData(chatMessageKey, updatedData)
    },
   * 
   */

  // TODO - suspense로 변경
  const { data } = useSuspenseQuery({
    queryKey: chatMessageKey,
    queryFn: () =>
      getAIMessages({
        assistantId,
        threadId,
        isFirstLoad: initChatContent === refreshChatContent,
        runRequired: initChatContent !== refreshChatContent,
      }),

    select: (messages) => messages.data,

    ...(isInitFetchAllowed
      ? {}
      : {
          staleTime: 0,
          cacheTime: 0,
        }),
  })

  return { data }
}
