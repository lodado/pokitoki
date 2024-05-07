/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import TutorialConnector from '@/components/Tutorial/TutorialConnector'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

import TopicOnSituationSection from './sections/TopicOnSituationSection'

export async function generateMetadata({ params: { locale } }: MetadataParams): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki dashboard',
    description: 'dashboard page',
    path: `${locale}/protected/dashboard/stat`,
    locale,
  })
}

const Page = async () => {
  // const t = await getI18n('Index')
  // const session = await getLoginSession()

  return (
    <LogScreen>
      {
        <main className="flex flex-col gap-spacing-7">
          <TopicOnSituationSection />
        </main>

        /* <TutorialConnector steps={steps} /> */
      }
    </LogScreen>
  )
}

export default Page
