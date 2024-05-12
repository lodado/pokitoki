import { Badge, BasicCardTemplate } from '@custompackages/designsystem'
import { i18nDate } from '@custompackages/shared'
import React from 'react'

import { getLocale } from '@/lib/next-inti'

const HistoryList = async () => {
  const locale = await getLocale()
  const dateFormat = i18nDate(locale, Date.now()).format()

  return (
    <BasicCardTemplate className="flex flex-row items-center justify-between px-2 h-11">
      <div className="flex flex-row gap-1">
        <Badge className="w-[4rem] align-center" variant="filled" color="brand">
          주제
        </Badge>
        <span className="flex items-center justify-center text-text-01 body-01-m">{dateFormat}</span>
      </div>

      <div>버튼</div>
    </BasicCardTemplate>
  )
}

export default HistoryList
