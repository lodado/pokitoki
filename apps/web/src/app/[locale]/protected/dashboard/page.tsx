/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen, ReactTutorial } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import TutorialConnector from '@/components/Tutorial/TutorialConnector'
import { getLoginSession } from '@/hooks/login'
import { getI18n } from '@/lib/i18n'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

export async function generateMetadata({ params: { locale } }: MetadataParams): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki dashboard',
    description: 'dashboard page',
    path: `${locale}/protected/dashboard`,
    locale,
  })
}
const List = () => {
  const ls = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col bg-white-white gap-[20px]">
      {ls.map((ele) => {
        return (
          <div key={ele} className={`Step${ele} justify-center align-middle flex h-[30vh]`}>
            {ele}
          </div>
        )
      })}
    </div>
  )
}

const steps = [
  {
    target: '.Step1',
    content: <h2>let begin our journey!</h2>,
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
    disableBeacon: true,
  },
  {
    target: '.Step2',
    content: <h2>let begin our journey!</h2>,
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
    disableBeacon: true,
  },
]
const Page = async () => {
  // const t = await getI18n('Index')
  // const session = await getLoginSession()

  return (
    <LogScreen>
      <List />
      <TutorialConnector steps={steps} />
    </LogScreen>
  )
}

export default Page
