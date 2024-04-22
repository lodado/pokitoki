import React, { ComponentProps } from 'react'
import Joyride, { TooltipRenderProps } from 'react-joyride'

import { Button } from '../Button'
import { Tooltip } from '../Tooltip'

const TutorialTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  skipProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => {
  return (
    <>
      <div className="bg-white-white" {...tooltipProps}>
        {step.title && step.title}
        <div>{step.content}</div>
        <div>
          <Button variant="primary" size="small" type="button" {...skipProps}>
            skip
          </Button>

          {index > 0 && (
            <Button variant="primary" size="small" type="button" {...backProps}>
              back
            </Button>
          )}
          {continuous && (
            <Button variant="primary" size="small" type="button" {...primaryProps}>
              next
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default TutorialTooltip
