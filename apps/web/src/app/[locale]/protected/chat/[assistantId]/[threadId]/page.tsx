/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import request from '@/api'
import TutorialConnector from '@/components/Tutorial/TutorialConnector'
import ChatGptServiceInstance from '@/server/service/chatgpt/ChatGptService'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

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
  const chat = await ChatGptServiceInstance.getChatLatestResponse(assistantId, threadId)

  return (
    <LogScreen>
      <ul>{chat}</ul>

      {/* <TutorialConnector steps={steps} /> */}
    </LogScreen>
  )
}

export default Page
