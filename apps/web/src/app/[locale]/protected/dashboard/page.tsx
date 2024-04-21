/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'

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

const Page = async () => {
  const t = await getI18n('Index')
  const session = await getLoginSession()

  return <LogScreen>123</LogScreen>
}

export default Page
