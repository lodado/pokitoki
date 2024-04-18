'use client'

import { ICON_GITHUB, ICON_GOOGLE, ICON_KAKAO } from '@custompackages/design-assets'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { authenticate } from '@/app/[locale]/login/action/login'

import LoginButton from './LoginButton'

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full h-[220px] flex-[0_0_auto]">
      <form action={dispatch} className="flex flex-col w-full gap-2 space-y-3">
        <LoginButton value="kakao">
          <ICON_KAKAO /> 카카오로 회원가입하기
        </LoginButton>

        <LoginButton value="google">
          <ICON_GOOGLE /> 구글로 회원가입하기
        </LoginButton>

        <LoginButton value="github">
          <ICON_GITHUB /> 깃허브로 회원가입하기
        </LoginButton>
      </form>
    </div>
  )
}

export default LoginForm
