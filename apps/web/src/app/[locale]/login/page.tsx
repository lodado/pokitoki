import { LogScreen, ResponsiveLayout } from '@custompackages/designsystem'

import { getI18n } from '@/lib/i18n'

import LoginForm from './components/LoginForm'

const Page = async () => {
  const t = await getI18n('LOGIN')

  return (
    <LogScreen>
      <ResponsiveLayout className="flex bg-[length:150px_150px] bg-[url('https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/login_bg.png')] bg-repeat-round bg-center flex-col justify-center items-center h-screen relative">
        <div className="flex flex-col items-center justify-center w-full h-3/5">
          <header className="flex flex-col items-center justify-center w-full h-[40rem] mt-[-3.5rem]">
            <span style={{ fontSize: '54px' }} className="heading-09 w-full h-[5rem] flex justify-center items-center ">
              {t('TITLE')}
              <img
                className="w-[54px] h-[18px] ml-2 mb-[1.2rem]"
                alt="pokitokiimage"
                src="https://c.animaapp.com/YfR8zSQn/img/frame-1000002635.svg"
              />
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
