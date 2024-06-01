import { Card } from '@custompackages/designsystem'
import React from 'react'

import { getI18n } from '@/lib/i18n'

import { ResponsiveSectionTitle } from '../../components/ResponsiveSectionTitle'

const PersonaSection = async () => {
  const i18nLearn = await getI18n('LEARN')
  const i18nDifficulty = await getI18n('DIFFICULTY')

  return (
    <section className="flex flex-col flex-grow">
      <div className="flex flex-row items-center justify-between">
        <ResponsiveSectionTitle
          title={i18nLearn('CUSTOMIZE-CONVERSATION-PARTNER-SECTION-TITLE')}
          subTitle={i18nLearn('CUSTOMIZE-PERSONA-OR-CHOOSE-RECOMMENDED-PERSONA')}
          ButtonText={i18nLearn('BUTTON-FOR-CUSTOMIZING-PERSONA')}
          difficulty={i18nDifficulty('RATING', { rating: '⭐⭐' })}
        />
      </div>

      <div className="relative grid flex-grow grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((ele, index) => {
          return (
            <Card
              // mocking code로 곧 변경할것
              key={index as any}
              className="w-[100%] h-[100%]"
              variant="medium"
              subTitle="apple"
              mainTitle="apple"
              url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
              alt=""
            />
          )
        })}
      </div>
    </section>
  )
}

export default PersonaSection
