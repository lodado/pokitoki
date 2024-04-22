'use client'

import { useIsClient } from '@custompackages/shared'
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react'
import Joyride from 'react-joyride'

import TutorialTooltip from './TutorialToolTip'

interface ReactTutorialProps extends Omit<ComponentProps<typeof Joyride>, 'run'> {
  run?: boolean
}

const ReactTutorial = ({ steps, run = true, ...rest }: ReactTutorialProps) => {
  const isClient = useIsClient()

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
        />
      )}
    </>
  )
}

export default ReactTutorial
