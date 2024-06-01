import { Button } from '@custompackages/designsystem'
import { redirect } from 'next/navigation'
import React from 'react'

import request from '@/api'
import { Profile } from '@/components'
import { getI18n } from '@/lib/i18n'
import { Thread } from '@/server/service/chatgpt/type'
import { MetadataParams } from '@/utils/metadata/metadata'

import RedirectToFreeTalkingButton from './RedirectButton'

const FreeTalkingSection = async () => {
  const i18nLearn = await getI18n('LEARN')
  const i18nDifficulty = await getI18n('DIFFICULTY')

  return (
    <section className="flex flex-row items-center justify-between px-4 rounded bg-primary-02-default shadow-card-02 py-spacing-5">
      <div className="flex flex-row justify-between w-full gap-spacing-6 sm:justify-start">
        <div className="flex items-center h-full">
          <Profile
            src="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/avat.png"
            alt="user profile"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-text-01 body-03-m">
            {i18nLearn('FREETALKING')}
            <span className="ml-0.5 text-text-primary detail-01-r">{i18nDifficulty('RATING', { rating: '⭐' })}</span>
          </h2>
          <p className="body-01-r text-text-03">{i18nLearn('FREETALKING-BUTTON-TEXT')}</p>

          <RedirectToFreeTalkingButton className="w-max sm:hidden">
            {i18nLearn('FREETALKING')}
          </RedirectToFreeTalkingButton>
        </div>
      </div>

      <RedirectToFreeTalkingButton className="hidden min-w-40 w-max sm:flex">
        {i18nLearn('FREETALKING')}
      </RedirectToFreeTalkingButton>
    </section>
  )
}

export default FreeTalkingSection
