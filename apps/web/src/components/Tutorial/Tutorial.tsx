'use client'

import { ReactTutorial } from '@custompackages/designsystem'
import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'

import { stepsAtom } from '@/store'

const Tutorial = () => {
  const steps = useAtomValue(stepsAtom)
  const [run, setRun] = useState(true)

  useEffect(() => {
    setRun(true)
  }, [steps])

  return <ReactTutorial steps={steps} run={run} onChangeRun={setRun} />
}

export default Tutorial
