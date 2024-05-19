import { ICON_MESSAGE_TOP } from '@custompackages/design-assets'
import { cva } from 'class-variance-authority'
import React from 'react'

import { ChatMessage } from '@/app/api/chatgpt/message/type'

import { Profile } from '../Profile'

export interface MessageProps {
  index: number
  message: ChatMessage
}

const StyledMessage = cva('flex flex-start p-3 shadow-tooltip rounded bg-background-default flex-nowrap break-all', {
  variants: {
    role: {
      assistant: 'relative left-[80px] w-[calc(50%)] min-h-[calc(100%-10px)]',
      user: 'relative w-[calc(50%)] right-[100px] min-h-[calc(100%-10px)]',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
})

const AssistantMessage = ({ message }: MessageProps) => {
  return (
    <>
      <div className="absolute left-0">
        <span>pokitoki</span>
        <Profile
          src="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/avat.png"
          alt="user profile"
        />
      </div>
      <div className={StyledMessage({ role: message.role })}>
        <Test className="absolute left-[-12px] z-[-1] top-10 rotate-90" />
        {message.content}
        <br />
      </div>
    </>
  )
}

const UserMessage = ({ message }: MessageProps) => {
  return (
    <>
      <div className="flex flex-row-reverse w-full">
        <div className={StyledMessage({ role: message.role })}>
          <Test className="absolute right-[-11px] z-[-1] -rotate-90 top-10" />
          {message.content}
        </div>
      </div>
      <div className="absolute right-3">
        <span>pokitoki</span>
        <Profile
          src="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/avat.png"
          alt="user profile"
        />
      </div>
    </>
  )
}

const MessageMap = {
  assistant: AssistantMessage,
  user: UserMessage,
}

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
  const MessageComponent = MessageMap[message.role]

  return (
    <div className="relative w-full h-max min-h-[100px] flex flex-row my-4">
      <MessageComponent index={index} message={message} />
    </div>
  )
}

export default Message
