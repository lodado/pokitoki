import { Card } from '@custompackages/designsystem'
import React from 'react'

import request from '@/api'
import { getAssistantList } from '@/app/api/chatgpt/assistant/api'
import { getI18n } from '@/lib/i18n'
import { Assistant } from '@/server/service/chatgpt/type'

import { ResponsiveSectionTitle } from '../../components/ResponsiveSectionTitle'

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
  const i18nDifficulty = await getI18n('DIFFICULTY')

  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <ResponsiveSectionTitle
          title={i18nLearn('TOPIC-BASED-SITUATION-TALKING-BUTTON')}
          subTitle={i18nLearn('SELECT-TOPIC-BASED-SITUATION-TALKING')}
          ButtonText={i18nLearn('TOPIC-BASED-SITUATION-TALKING-BUTTON')}
          difficulty={i18nDifficulty('RATING', { rating: '별별별' })}
        />
      </div>

      <div className="flex flex-row gap-2 overflow-x-scroll overflow-y-hidden">
        {assistants.map(({ name, description }: Assistant) => {
          return (
            <Card
              key={name}
              className="shrink-0"
              variant="medium"
              subTitle={description!}
              mainTitle={name!}
              url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
              alt=""
            />
          )
        })}

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
