'use client'

import { Badge, BasicCardTemplate } from '@custompackages/designsystem'
import { i18nDate, useIsClient } from '@custompackages/shared'
import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import React, { use } from 'react'

import { getRecentHistoryList } from '@/app/api/chatgpt/thread/history/api'

const HistoryList = () => {
  const locale = useLocale()
  const { data } = useSuspenseQuery({
    queryKey: ['stat/history/recentHistoryList'],
    queryFn: () => getRecentHistoryList(),
    staleTime: 0,
  })

  const { topics } = data

  return (
    <>
      {topics.map(({ id, threadCategory, threadName, createdAt }) => {
        const dateFormat = i18nDate(locale, createdAt).format('YYYY-MM-DD HH:mm')

        return (
          <BasicCardTemplate id={id} className="flex flex-row items-center justify-between px-2 h-11">
            <div className="flex flex-row gap-1">
              <Badge className="w-[4rem] align-center" variant="filled" color="brand">
                {threadCategory}
              </Badge>
              <span className="flex items-center justify-center text-text-01 body-01-m">
                {threadName} {dateFormat}
              </span>
            </div>

            <div>버튼</div>
          </BasicCardTemplate>
        )
      })}
    </>
  )
}

export default HistoryList
