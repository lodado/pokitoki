/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen, ReactTutorial } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import { getLoginSession } from '@/hooks/login'
import { getI18n } from '@/lib/i18n'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

export async function generateMetadata({ params: { locale } }: MetadataParams): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki self study page',
    description: 'self study page',
    path: `${locale}/protected/dashboard/selfstudy`,
    locale,
  })
}

const steps: any[] = []

const Page = async () => {
  // const t = await getI18n('Index')
  // const session = await getLoginSession()

  return (
    <LogScreen>
      <ReactTutorial steps={steps} />
    </LogScreen>
  )
}

export default Page
