'use client'

import { useIsClient } from '@custompackages/shared'
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

import TutorialTooltip from './TutorialToolTip'

interface ReactTutorialProps extends Omit<ComponentProps<typeof Joyride>, 'run'> {
  run?: boolean
  onChangeRun: (newRunState: boolean) => void
}

interface JoyrideCallbackData extends CallBackProps {}

const ReactTutorial = ({ steps, run, onChangeRun, ...rest }: ReactTutorialProps) => {
  const isClient = useIsClient()

  const handleJoyrideCallback = (data: JoyrideCallbackData) => {
    const { status, type } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    // @ts-ignore
    if (finishedStatuses.includes(status)) {
      onChangeRun(false)
    }
  }

  const preprocessedSteps = useMemo(() => {
    return steps.map((step) => {
      return {
        disableBeacon: true,
        ...step,
      }
    })
  }, [steps])

  return (
    <>
      {isClient && (
        <Joyride
          steps={preprocessedSteps}
          continuous
          run={run}
          scrollToFirstStep
          showProgress
          showSkipButton
          styles={{
            options: {
              zIndex: 50,
            },
          }}
          {...rest}
          callback={handleJoyrideCallback}
        />
      )}
    </>
  )
}

export default ReactTutorial
