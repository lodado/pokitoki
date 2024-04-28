/* eslint-disable jsx-a11y/label-has-associated-control */

import { Button, LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'

import TutorialConnector from '@/components/Tutorial/TutorialConnector'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

import FreeTalkingSection from './sections/freeTalking/FreeTalkingSection'
import PersonaSection from './sections/PersonaSection'
import TopicOnSituationSection from './sections/TopicOnSituationSection'

export async function generateMetadata({ params: { locale } }: MetadataParams): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki self study page',
    description: 'dashboard page',
    path: `${locale}/protected/dashboard/selfstudy`,
    locale,
  })
}

const Page = async () => {
  // const t = await getI18n('Index')
  // const session = await getLoginSession()

  return (
    <LogScreen>
      <main className="flex flex-col gap-spacing-7">
        <FreeTalkingSection />

        <TopicOnSituationSection />

        <PersonaSection />
      </main>

      {/* <TutorialConnector steps={steps} /> */}
    </LogScreen>
  )
}

export default Page
