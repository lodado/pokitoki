'use client'

import { Button } from '@custompackages/designsystem'
import { duration, useInterval, utc } from '@custompackages/shared'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useLocale } from 'next-intl'
import React, { useEffect, useRef } from 'react'

import { postUserStudyTime } from '@/app/api/protected/attendance/api'
import { useLoginSession } from '@/hooks/login'
import { studyTimeAtom } from '@/store/studyTime'

const ChatRecordButton = () => {
  const startTimeRef = useRef(utc())
  const [studyTime, setStudyTime] = useAtom(studyTimeAtom)
  const resetStudyTime = useResetAtom(studyTimeAtom)

  useInterval(() => {
    if (!document.hidden) setStudyTime((time) => time + 1)
  }, 1000)

  useEffect(() => {
    let flag = false

    const postUserStudyTimeBeforeUnload = async () => {
      if (flag) {
        return
      }

      flag = true
      if (studyTime > 60 * 1000) await postUserStudyTime({ studyTime })
      flag = false
      resetStudyTime()
    }

    window.addEventListener('beforeunload', postUserStudyTimeBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', postUserStudyTimeBeforeUnload)
      postUserStudyTimeBeforeUnload()
    }
  }, [])

  return (
    <Button className="rounded-full w-[7rem]" size="small" variant="primary">
      경과 시간 {duration(studyTime * 1000).format('mm:ss')}
    </Button>
  )
}

export default ChatRecordButton
