import { Badge, BasicCardTemplate } from '@custompackages/designsystem'
import { i18nDate } from '@custompackages/shared'
import React from 'react'

import { getRecentHistoryList } from '@/app/api/chatgpt/thread/history/api'
import { getLocale } from '@/lib/next-inti'

const HistoryList = async () => {
  const { topics } = await getRecentHistoryList()

  const locale = await getLocale()

  return (
    <>
      {topics.map(({ id, threadCategory, createdAt }) => {
        const dateFormat = i18nDate(locale, createdAt).format('YYYY-MM-DD HH:mm')

        return (
          <BasicCardTemplate id={id} className="flex flex-row items-center justify-between px-2 h-11">
            <div className="flex flex-row gap-1">
              <Badge className="w-[4rem] align-center" variant="filled" color="brand">
                {threadCategory}
              </Badge>
              <span className="flex items-center justify-center text-text-01 body-01-m">{dateFormat}</span>
            </div>

            <div>버튼</div>
          </BasicCardTemplate>
        )
      })}
    </>
  )
}

export default HistoryList
