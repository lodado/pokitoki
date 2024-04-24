'use client'

import { useSetAtom } from 'jotai'
import React, { useEffect } from 'react'

import { setStepsAtom, TutorialStep } from '@/store'

interface TutorialConnectorProps {
  steps: TutorialStep[]
}

const TutorialConnector = ({ steps }: TutorialConnectorProps) => {
  const setSteps = useSetAtom(setStepsAtom)

  useEffect(() => {
    setSteps(steps)
  }, [steps])

  return null
}

export default TutorialConnector
