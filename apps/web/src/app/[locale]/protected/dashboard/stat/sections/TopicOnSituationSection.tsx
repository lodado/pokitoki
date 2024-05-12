import { Card } from '@custompackages/designsystem'
import React from 'react'

import request from '@/api'
import { getAssistantList } from '@/app/api/chatgpt/assistant/api'
import { getI18n } from '@/lib/i18n'
import { Assistant } from '@/server/service/chatgpt/type'

/** <Card
        variant="medium"
        subTitle="apple"
        mainTitle="apple"
        url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
        alt=""
      /> */

const TopicOnSituationSection = async () => {
  const { assistants } = await getAssistantList()

  const i18nLearn = await getI18n('LEARN')
  const i18nStat = await getI18n('STAT')

  // const i18nDifficulty = await getI18n('DIFFICULTY')

  return (
    <section className="flex flex-col gap-1">
      <div className="flex flex-col justify-between gap-1">
        <h2 className="body-03-m text-text-01">{i18nStat('RECOMMEND-TITLE')}</h2>
        <p className="text-text-03 body-01-r">{i18nStat('RECOMMEND-DESCRIPTION')}</p>
      </div>

      <div className="flex flex-row gap-2 px-1 py-2 overflow-x-scroll overflow-y-hidden">
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
      </div>
    </section>
  )
}

export default TopicOnSituationSection
