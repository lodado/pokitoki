/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen, ReactTutorial } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import { getLoginSession } from '@/hooks/login'
import { getI18n } from '@/lib/i18n'
import { getMetadata } from '@/utils'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki dashboard',
    description: 'dashboard page',
    path: '/login',
  })
}
const List = () => {
  const ls = [1, 2, 3, 4, 5]

  return (
    <ul className="flex flex-col bg-white-white gap-[20px]">
      {ls.map((ele) => {
        return (
          <li key={ele} className={`Step${ele} justify-center align-middle flex w-[200px] h-[200px]`}>
            {ele}
          </li>
        )
      })}
    </ul>
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
      <ReactTutorial steps={steps} />
    </LogScreen>
  )
}

export default Page
