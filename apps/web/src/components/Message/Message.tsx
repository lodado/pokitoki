import { ICON_MESSAGE_TOP } from '@custompackages/design-assets'
import { cva } from 'class-variance-authority'
import React from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'

export interface MessageProps {
  index: number
  message: ChatMessage
}

const StyledMessage = cva(
  'absolute  w-[calc(100%-12px)] top-[5px] left-[12px] shadow-tooltip rounded bg-background-default overflow-visible',
  {
    variants: {
      isCurrentUrl: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      isCurrentUrl: false,
    },
  },
)

const Test = (props) => {
  return (
    <svg
      width="15px"
      height="12px"
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
      style={{
        fill: 'white',
        filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 3px)',
        clipPath: 'inset(0px -10px -10px)',

        display: 'block',
        zIndex: 5,
      }}
      {...props}
    >
      <polygon points="0,0 30,0 15,10" />
    </svg>
  )
}

const Message = ({ index, message }: MessageProps) => {
  return (
    <li className="relative">
      <div className={StyledMessage({})}>
        <Test className="absolute left-[-13px] top-[10px] z-30 rotate-90" />

        {message.role}
        {message.content}
        <br />
        {message.id}
      </div>
    </li>
  )
}

export default Message
