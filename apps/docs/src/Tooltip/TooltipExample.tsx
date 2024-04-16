import { Tooltip } from '@custompackages/designsystem'
import React from 'react'

const TooltipExample = ({ side = 'left', align = 'top', ...rest }: any) => {
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger>
        <button type="button">hover me!</button>
      </Tooltip.Trigger>

      <Tooltip.Content side={side} align={align}>
        Max width of tooltips is 240px - wrap text if necessary.
      </Tooltip.Content>
    </Tooltip>
  )
}

export default TooltipExample
