/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
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
    <ul className="flex flex-col  gap-[20px]">
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
const Page = async () => {
  // const t = await getI18n('Index')
  // const session = await getLoginSession()

  return (
    <LogScreen>
      <List />
    </LogScreen>
  )
}

export default Page
