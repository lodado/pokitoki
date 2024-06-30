import { ICON_LOGO } from '@custompackages/design-assets'
import { LogScreen, ResponsiveLayout } from '@custompackages/designsystem'

import { Logo } from '@/components'
import { getI18n } from '@/lib/i18n'
import { setServerComponentSSG } from '@/lib/i18n/index.server'
import { GenerateStaticParamsI18n } from '@/lib/i18n/option'

import LoginForm from './components/LoginForm'

export function generateStaticParams() {
  return GenerateStaticParamsI18n()
}

const Page = async ({ params: { locale } }: any) => {
  setServerComponentSSG(locale)
  const t = await getI18n('LOGIN')

  return (
    <LogScreen>
      <ResponsiveLayout className="relative flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center w-full h-3/5">
          <header className="flex flex-col items-center justify-center w-full h-[40rem] mt-[-3.5rem]">
            <span className="text-white text-[56px] sm:text-[67px] w-full h-[5rem] flex justify-center items-center ">
              <Logo title={t('TITLE')} />
              <ICON_LOGO width="80px" height="80px" className="mb-3" />
            </span>

            <p className="body-01-r text-gray-12">{t('SUBTITLE')}</p>
          </header>

          <LoginForm />
        </div>
      </ResponsiveLayout>
    </LogScreen>
  )
}

export default Page
