'use client'

import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'

import { getAIMessages, getAIMessagesByStorage } from '@/app/api/chatgpt/message/api'
import useUrl from '@/hooks/useUrl'
import { useQuery, useQueryClient } from '@/lib/tanstackQuery'

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

  // TODO - suspense로 변경
  const { data, isLoading, isError, error, refetch } = useQuery(
    chatMessageKey,
    () =>
      getAIMessagesByStorage({
        assistantId,
        threadId,
      }),
    {
      initialData: () => {
        return { data: [] }
      },
      enabled: !!threadId && !!assistantId,
      select: (messages) => messages.data,

      refetchOnMount: true,

      onSuccess: async (cachedMessages) => {
        const updatedData = await getAIMessages({
          assistantId,
          threadId,
          isFirstLoad: initChatContent === refreshChatContent,
          runRequired: initChatContent !== refreshChatContent,
          cachedData: cachedMessages,
        })

        queryClient.setQueryData(chatMessageKey, updatedData)
      },
      ...(isInitFetchAllowed
        ? {}
        : {
            staleTime: 0,
            cacheTime: 0,
          }),
    },
  )

  return { data, isLoading, isError }
}
