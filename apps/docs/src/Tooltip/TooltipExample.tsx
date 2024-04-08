import { Tooltip } from '@custompackages/designsystem'
import React from 'react'

const TooltipExample = (props: any) => {
  return (
    <Tooltip {...props}>
      <Tooltip.Trigger>
        <button type="button">hover me!</button>
      </Tooltip.Trigger>

      <Tooltip.Content side="top" align="center">
        12323
      </Tooltip.Content>
    </Tooltip>
  )
}

export default TooltipExample
