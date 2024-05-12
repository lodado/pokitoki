/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'
import { useRef } from 'react'

import TutorialConnector from '@/components/Tutorial/TutorialConnector'
import { LocaleProps } from '@/interface'
import { getMetadata } from '@/utils'
import { MetadataParams } from '@/utils/metadata/metadata'

import AttendanceSection from './sections/Attendance/AttendanceSection'
import HistorySection from './sections/history/HistorySection'
import TopicOnSituationSection from './sections/TopicOnSituationSection'
import UserInfoSection from './sections/UserInfoSection'

export async function generateMetadata({ params: { locale } }: MetadataParams): Promise<Metadata> {
  return getMetadata({
    title: 'pokitoki dashboard',
    description: 'dashboard page',
    path: `${locale}/protected/dashboard/stat`,
    locale,
  })
}

const Page = async ({ params }: LocaleProps) => {
  // const t = await getI18n('Index')
  // const session = await getLoginSession()

  return (
    <LogScreen>
      <main className="flex flex-col pt-1 gap-spacing-7">
        <UserInfoSection />
        <TopicOnSituationSection />
        <HistorySection />
        <AttendanceSection />
      </main>

      {/* <TutorialConnector steps={steps} /> */}
    </LogScreen>
  )
}

export default Page
