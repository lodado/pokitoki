'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */

import { Button, LogEvent, LogScreen } from '@custompackages/designsystem'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { authenticate } from '@/app/[locale]/login/aggregate/login'
import { useLoginSession } from '@/hooks/login'

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const { data: session } = useLoginSession()

  console.log(session)

  return (
    <LogScreen>
      <button type="button" className="w-40 h-10 bg-warning-02-hover">
        123213
      </button>

      <form action={dispatch} className="space-y-3">
        <div className="flex-1 px-6 pt-8 pb-4 rounded-lg bg-gray-50">
          <h1 className={`  mb-3 text-2xl`}>Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <LogEvent params="login dummy click">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    console.log('hi!')
                  }}
                >
                  Button
                </Button>
              </LogEvent>
              <label className="block mt-5 mb-3 text-xs font-medium text-gray-900" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block mt-5 mb-3 text-xs font-medium text-gray-900" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <LoginButton />
          <div className="flex items-end h-8 space-x-1" aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <>
                <div className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </LogScreen>
  )
}

const LoginButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button type="button" onClick={() => setTheme('light')}>
        Light Mode
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        Dark Mode
      </button>

      <LogEvent>
        <button type="submit" className="w-full mt-4">
          Log in <div className="w-5 h-5 ml-auto text-gray-50" />
        </button>
      </LogEvent>
    </>
  )
}

export default LoginForm
