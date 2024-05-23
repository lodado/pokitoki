'use client'

import { Badge, BasicCardTemplate } from '@custompackages/designsystem'
import { i18nDate, useIsClient } from '@custompackages/shared'
import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import React, { use } from 'react'

import { getRecentHistoryList } from '@/app/api/chatgpt/thread/history/api'
import { useI18n } from '@/lib/i18n'
import { useSetAtom } from '@/lib/jotai'
import { chatInformationDialogAtom } from '@/store'

const HistoryList = () => {
  const locale = useLocale()
  const i18nStat = useI18n('STAT')
  const i18nDialog = useI18n('ENTERDIALOG')

  const { data } = useSuspenseQuery({
    queryKey: ['stat/history/recentHistoryList'],
    queryFn: () => getRecentHistoryList(),
    staleTime: 0,
  })

  const setChatInformationDialog = useSetAtom(chatInformationDialogAtom)

  const { topics } = data

  return (
    <>
      {topics.map((topic) => {
        const { id, assistantId, threadId, createdAt, threadCategory, threadName } = topic
        const dateFormat = i18nDate(locale, createdAt).format('YYYY-MM-DD HH:mm')

        return (
          <BasicCardTemplate
            id={id}
            className="flex flex-row items-center justify-between px-2 h-11"
            onClick={() => {
              setChatInformationDialog({
                state: 'ENTER',
                topic: {
                  assistantId,
                  threadId,
                },
                chatDialogDescription: {
                  header: i18nStat('RECOMMEND-TITLE'),
                  body: i18nDialog('DIALOG-BODY'),
                  category: 'recommend',
                },
              })
            }}
          >
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
