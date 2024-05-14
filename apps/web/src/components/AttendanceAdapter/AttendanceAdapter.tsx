'use client'

import { useInterval, utc } from '@custompackages/shared'
import { useLocale } from 'next-intl'
import React, { useEffect, useRef } from 'react'

import { postUserStudyTime } from '@/app/api/protected/attendance/api'
import { useLoginSession } from '@/hooks/login'

const AttendanceAdapter = () => {
  const { data } = useLoginSession()
  const locale = useLocale()

  const startTimeRef = useRef(utc())
  const studyTimeRef = useRef(0)

  useInterval(() => {
    studyTimeRef.current = utc() - startTimeRef.current
  }, 1000)

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      const studyTime = studyTimeRef.current

      if (studyTime > 20) await postUserStudyTime({ studyTime })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return <></>
}

export default AttendanceAdapter
