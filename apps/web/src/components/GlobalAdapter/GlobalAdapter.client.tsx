'use client'

import React, { useEffect } from 'react'

import Tutorial from '@/components/GlobalAdapter/Tutorial/Tutorial'

import useGlobalAttendance from './useGlobalAttendance'

function setScreenSize() {
  // 먼저 뷰포트 높이를 얻고 1%를 곱하여 vh 단위 값을 얻습니다.
  const vh = window.innerHeight * 0.01
  // 그런 다음 --vh 사용자 정의 속성의 값을 문서의 루트로 설정합니다.
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  document.documentElement.style.setProperty('--height', `${window.innerHeight}px`)

  console.log('update vh!', vh)
}

const GlobalAdapterClient = () => {
  useGlobalAttendance()

  useEffect(() => {
    setScreenSize()

    document.addEventListener('resize', setScreenSize)
    return () => {
      document?.removeEventListener('resize', setScreenSize)
    }
  }, [])

  return (
    <>
      <Tutorial />
    </>
  )
}

export default GlobalAdapterClient
