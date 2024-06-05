/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import TutorialConnector from '@/components/GlobalAdapter/Tutorial/TutorialConnector'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

import { ChatInput } from '../../components/ChatInput'
import { ChatHeader, FreetalkingChatContent } from './components'

interface ChatPageProps extends MetadataParams {
  params: {
    locale: string
    assistantId: string
    threadId: string
  }
}

export async function generateMetadata({
  params: { locale, assistantId, threadId },
}: ChatPageProps): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki free talking',
    description: 'talking with assistent page',
    path: `${locale}/protected/chat/${assistantId}/${threadId}`,
    locale,
  })
}

const Page = async ({ params: { locale, assistantId, threadId } }: ChatPageProps) => {
  return (
    <LogScreen>
      <main className="relative flex flex-col w-full h-full overflow-y-scroll scrollbar-hide bg-background-01 ">
        <ChatHeader />
        <FreetalkingChatContent />
        <div id="make-scrollable" />
      </main>
      {/* <TutorialConnector steps={steps} /> */}
    </LogScreen>
  )
}

export default Page
