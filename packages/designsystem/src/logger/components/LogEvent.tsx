/* eslint-disable consistent-return */
import React from 'react'

import { createLog } from '../utils/logger'
import { useLogParams } from './LogParamsProvider'
import { logParams, ReactEventHandlers } from './type'

export interface LogEventProps {
  children: React.ReactNode

  params?: logParams
  eventNames?: ReactEventHandlers[keyof ReactEventHandlers][]
}

const LogEvent = ({ children, params = 'click', eventNames = ['onClick'] }: LogEventProps) => {
  const child = React.Children.only(children) as JSX.Element
  const urlParams = useLogParams()

  return (
    <>
      {React.cloneElement(child, {
        ...eventNames.reduce((total: any, eventName) => {
          if (eventName) {
            // eslint-disable-next-line no-param-reassign
            total[eventName] = (...args: any[]) => {
              createLog({ level: 'info', log: `${urlParams}/${params}`, event: `${eventName}` })

              if (child.props && typeof child.props[eventName] === 'function') {
                return child.props[eventName](...args)
              }
            }
          }

          return total
        }, {}),
      })}
    </>
  )
}

export default LogEvent
