import { LogScreen, ResponsiveLayout } from '@custompackages/designsystem'

import LoginForm from './components/LoginForm'

const Page = () => {
  return (
    <LogScreen>
      <ResponsiveLayout className="flex bg-[url('https://c.animaapp.com/jDt1VAaj/img/union.png')] bg-repeat bg-auto bg-center flex-col justify-center items-center h-screen relative">
        <div className="flex flex-col items-center justify-center w-full h-3/5">
          <header className="flex flex-col items-center justify-center w-full h-[40rem] mt-[-3.5rem]">
            <span
              style={{ fontSize: '54px' }}
              className="heading-09 w-full h-[5rem] flex justify-center items-center ml-[4rem]"
            >
              포키토키
              <img
                className="w-[54px] h-[18px] ml-2 mb-[1.2rem]"
                alt="pokitokiimage"
                src="https://c.animaapp.com/YfR8zSQn/img/frame-1000002635.svg"
              />
            </span>

            <p className="body-01-r text-gray-12">내 손안의 AI 스피킹 튜터</p>
          </header>

          <LoginForm />
        </div>
      </ResponsiveLayout>
    </LogScreen>
  )
}

export default Page
