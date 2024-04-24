'use client'

import { ReactTutorial } from '@custompackages/designsystem'
import { useAtomValue } from 'jotai'
import React from 'react'

import { stepsAtom } from '@/store'

const Tutorial = () => {
  const steps = useAtomValue(stepsAtom)

  return <ReactTutorial steps={steps} />
}

export default Tutorial
