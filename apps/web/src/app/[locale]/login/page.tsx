'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */

import { Button, LogEvent, LogScreen, ResponsiveLayout } from '@custompackages/designsystem'
import { useFormState, useFormStatus } from 'react-dom'

import { authenticate } from '@/app/[locale]/login/action/login'
import { useLoginSession } from '@/hooks/login'

import { LOGIN_METHOD } from './variable'

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const { data: session } = useLoginSession()

  return (
    <LogScreen>
      <ResponsiveLayout className="flex bg-[url('https://c.animaapp.com/jDt1VAaj/img/union.png')] bg-repeat bg-auto bg-center flex-col items-center justify-center gap-[10px] h-screen pt-0 pb-[60px] px-[30px] relative">
        <div className="flex flex-col w-[536px] items-center gap-[73px] relative flex-[0_0_auto]">
          <img
            className="absolute w-[54px] h-[18px] top-[23px] left-[14px]"
            alt="Frame"
            src="https://c.animaapp.com/YfR8zSQn/img/frame-1000002635.svg"
          />
          <p className="relative w-fit font-body-03-long-r font-[number:var(--body-03-long-r-font-weight)] text-[color:var(--color-gray-12)] text-[length:var(--body-03-long-r-font-size)] tracking-[var(--body-03-long-r-letter-spacing)] leading-[var(--body-03-long-r-line-height)] [font-style:var(--body-03-long-r-font-style)]">
            내 손안의 AI 스피킹 튜터
          </p>
        </div>

        <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
          <form action={dispatch} className="space-y-3">
            <LogEvent>
              <Button type="submit" name={LOGIN_METHOD} value="kakao" className="!self-stretch !w-full">
                카카오로 회원가입하기
              </Button>
            </LogEvent>
            <LogEvent>
              <Button
                type="submit"
                name={LOGIN_METHOD}
                value="naver"
                className="!self-stretch !w-full"
                // icon={<Three className="!relative !w-[16px] !h-[16px]" />}
              >
                네이버로 회원가입하기
              </Button>
            </LogEvent>

            <LogEvent>
              <Button
                type="submit"
                name={LOGIN_METHOD}
                value="google"
                className="!self-stretch !w-full"
                //  icon={<SocialIcons2 className="!relative !w-[18px] !h-[18px]" />}
              >
                구글로 회원가입하기
              </Button>
            </LogEvent>

            <LogEvent>
              <Button
                type="submit"
                name={LOGIN_METHOD}
                value="github"
                className="!self-stretch !w-full"
                //  icon={<SocialIcons2 className="!relative !w-[18px] !h-[18px]" />}
              >
                깃허브로 회원가입하기
              </Button>
            </LogEvent>
          </form>
        </div>
      </ResponsiveLayout>
    </LogScreen>
  )
}

export default LoginForm
