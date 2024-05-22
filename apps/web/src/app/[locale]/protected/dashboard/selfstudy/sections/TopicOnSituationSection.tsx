import { Card } from '@custompackages/designsystem'
import React from 'react'

import request from '@/api'
import { getAssistantList } from '@/app/api/chatgpt/assistant/api'
import { getConversationTopicList } from '@/app/api/protected/conversation/topic/api'
import { ThreadEntranceCard } from '@/components'
import { getI18n } from '@/lib/i18n'
import { Assistant } from '@/server/service/chatgpt/type'

import { ResponsiveSectionTitle } from '../../components/ResponsiveSectionTitle'

const TopicOnSituationSection = async () => {
  const i18nLearn = await getI18n('LEARN')
  const i18nDifficulty = await getI18n('DIFFICULTY')

  const i18nDialog = await getI18n('ENTERDIALOG')

  const { topics } = await getConversationTopicList()

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

      <div className="flex flex-row gap-2 p-2 overflow-x-scroll overflow-y-hidden">
        {topics.map((params) => {
          const { id, assistantId, description, title } = params

          return (
            <ThreadEntranceCard
              key={id}
              className="shrink-0"
              variant="medium"
              subTitle={description}
              mainTitle={title}
              url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
              alt=""
              assistantInfo={params}
              chatDialogDescription={{
                header: i18nLearn('DIALOG-HEADER'),
                body: i18nDialog('DIALOG-BODY'),
                category: 'topic',
              }}
            />
          )
        })}
      </div>
    </section>
  )
}

export default TopicOnSituationSection
