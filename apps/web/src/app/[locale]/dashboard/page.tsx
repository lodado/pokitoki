/* eslint-disable jsx-a11y/label-has-associated-control */

import { LogScreen } from '@custompackages/designsystem'
import { Metadata } from 'next'

import { authenticate } from '@/actions/login'
import { signOut } from '@/app/api/auth/auth'
import { getI18n } from '@/lib/i18n'
import { getMetadata } from '@/utils'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'login page',
    description: 'login하는 page입니다.',
    path: '/login',
  })
}

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        'use server'
      }}
    >
      <button type="submit">logout</button>
    </form>
  )
}

const Paragraph = Array.from({ length: 10 }).map((_, i) => {
  // eslint-disable-next-line react/no-array-index-key
  return <p key={i}>{i} paragraph</p>
})

const Page = async () => {
  const t = await getI18n('Index')

  return (
    <>
      <LogScreen>
        <div>
          ${t('title')}
          <LogoutButton />
          <div data-animate data-animate-speed="slow">
            {Paragraph}
          </div>
        </div>
      </LogScreen>
    </>
  )
}

export default Page
