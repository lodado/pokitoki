import React from 'react'

import { Profile } from '../../Profile'
import { StyledMessage } from '../style'
import { MessageProps } from '../type'
import { SpeechBalloon } from './SpeechBalloon'

export const UserMessage = ({ message }: MessageProps) => {
  return (
    <>
      <div className="flex flex-row-reverse w-full">
        <div className={StyledMessage({ role: message.role })}>
          <SpeechBalloon className="absolute right-[-11px] -rotate-90 top-3" />
          {message.content}
        </div>
      </div>
      <div className="absolute flex flex-col items-center justify-center w-max right-3">
        <span>user</span>
        <Profile
          src="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/avat.png"
          alt="user profile"
        />
      </div>
    </>
  )
}
