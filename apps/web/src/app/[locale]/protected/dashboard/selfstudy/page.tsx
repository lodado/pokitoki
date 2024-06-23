/* eslint-disable jsx-a11y/label-has-associated-control */

import { Button, LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'

import TutorialConnector from '@/components/GlobalAdapter/Tutorial/TutorialConnector'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

import EnterChatInformationDialog from '../components/EnterChatInformationDialog/EnterChatInformationDialog'
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
  return (
    <LogScreen>
      <main className="flex flex-col gap-spacing-7 h-[inherit]">
        <FreeTalkingSection />
        <TopicOnSituationSection />
        <PersonaSection />
      </main>

      <EnterChatInformationDialog />
      {/* <TutorialConnector steps={steps} /> */}
    </LogScreen>
  )
}

export default Page
