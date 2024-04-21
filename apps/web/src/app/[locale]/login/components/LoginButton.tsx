'use client'

import { Button, LogEvent, Tooltip } from '@custompackages/designsystem'
import { LocalStorageStrategy, StorageController, useIsClient } from '@custompackages/shared'
import { cva } from 'class-variance-authority'
import React, { FC, ReactNode, useEffect, useLayoutEffect, useState } from 'react'

import { useI18n } from '@/hooks/i18n'

import { LOGIN_METHOD } from '../variable'

interface LoginButtonProps {
  value: 'google' | 'kakao' | 'github'
  children: ReactNode
}

const LoginButtonStyles = cva(
  'shadow-card-02 flex gap-2 body-03-m justify-center align-middle mx-spacing-6 p-spacing-4 h-14 rounded-md',
  {
    variants: {
      value: {
        kakao: 'bg-[#FEE500] text-text-01',
        google: `bg-[#fff] text-text-01`,
        github: 'bg-[#24292F] text-background-extension-onlywhite',
      },
    },
    defaultVariants: {},
  },
)

const userInfo = new StorageController<LoginButtonProps['value']>(new LocalStorageStrategy('/login/userinfo'))

const LoginButton: FC<LoginButtonProps> = ({ value, children }) => {
  const isClient = useIsClient()
  const [lastLoginInfo, _] = useState(userInfo.read())
  const t = useI18n('LOGIN')

  const handleUpdateLoginUserInfo = () => {
    userInfo.update(value)
  }

  /** radix ToolTip에 hydration bug가 있음 */
  if (!isClient)
    return (
      <Button
        type="submit"
        name={LOGIN_METHOD}
        variant="custom"
        size="large"
        value={value}
        className={LoginButtonStyles({ value })}
        onClick={handleUpdateLoginUserInfo}
      >
        {children}
      </Button>
    )

  return (
    <Tooltip defaultOpen={lastLoginInfo === value}>
      <Tooltip.Trigger>
        <Button
          type="submit"
          name={LOGIN_METHOD}
          variant="custom"
          size="large"
          value={value}
          className={LoginButtonStyles({ value })}
          onClick={handleUpdateLoginUserInfo}
        >
          {children}
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Content side="bottom" align="center" className="z-100 text-text-01 detail-02-r">
        {lastLoginInfo === value ? t('TOOLTIP-LASTLOGINTEXT') : t('TOOLTIP-TEXT')}
      </Tooltip.Content>
    </Tooltip>
  )
}

export default LoginButton
