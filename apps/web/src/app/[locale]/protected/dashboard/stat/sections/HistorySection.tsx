import React from 'react'

import { getI18n } from '@/lib/i18n'

import { SelfStudySectionTitle } from '../components/SelfStudySectionTitle'

const HistorySection = async () => {
  const i18nLearn = await getI18n('LEARN')
  const i18nDifficulty = await getI18n('DIFFICULTY')

  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <SelfStudySectionTitle
          title={i18nLearn('TOPIC-BASED-SITUATION-TALKING-BUTTON')}
          subTitle={i18nLearn('SELECT-TOPIC-BASED-SITUATION-TALKING')}
          ButtonText={i18nLearn('TOPIC-BASED-SITUATION-TALKING-BUTTON')}
          difficulty={i18nDifficulty('RATING', { rating: '별별별' })}
        />
      </div>
    </section>
  )
}

export default HistorySection
