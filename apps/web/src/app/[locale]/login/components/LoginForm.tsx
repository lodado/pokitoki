'use client'

import { ICON_GITHUB, ICON_GOOGLE, ICON_KAKAO } from '@custompackages/design-assets'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { useI18n } from '@/hooks/i18n'

import { authenticate } from '../action/login'
import LoginButton from './LoginButton'

const LoginForm = () => {
  const t = useI18n('LOGIN')
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <div className="flex flex-col items-start gap-6 relative self-stretch w-full h-[220px] flex-[0_0_auto]">
      <form action={dispatch} className="flex flex-col w-full gap-2 space-y-3">
        <LoginButton value="kakao">
          <ICON_KAKAO /> {t('KAKAO')}
        </LoginButton>

        <LoginButton value="google">
          <ICON_GOOGLE /> {t('GOOGLE')}
        </LoginButton>

        <LoginButton value="github">
          <ICON_GITHUB /> {t('GITHUB')}
        </LoginButton>
      </form>
    </div>
  )
}

export default LoginForm
