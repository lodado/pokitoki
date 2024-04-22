import { ICON_LOGO } from '@custompackages/design-assets'
import { LogScreen, ResponsiveLayout } from '@custompackages/designsystem'

import { Logo } from '@/components'
import { getI18n } from '@/lib/i18n'

import LoginForm from './components/LoginForm'

/**
 * next-intl 버그로 인해 ssg로 제공해야하지만 일시적으로 ssr로 제공함
 * https://github.com/amannn/next-intl/discussions/819
 */
const Page = async () => {
  const t = await getI18n('LOGIN')

  return (
    <LogScreen>
      <ResponsiveLayout className="flex bg-[length:150px_150px] bg-[url('https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/login_bg.png')] bg-repeat-round bg-center flex-col justify-center items-center h-screen relative">
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
