import { ICON_LOGO } from '@custompackages/design-assets'
import { Button } from '@custompackages/designsystem'
import React from 'react'

import { Logo } from '@/components'

import ChatRecordButton from './ChatRecordButton'

const ChatHeader = () => {
  return (
    <section className="sticky flex flex-col justify-center items-center w-full h-[10.2rem] border-0 border-b-solid border-b border-b-[rgba(0, 0, 0, 0.25)] mb-0">
      <h1 className="flex flex-row items-center justify-center">
        <Logo title="Pokitoki" className="w-[10rem] text-4xl" />
        <ICON_LOGO width="50px" height="50px" className="mb-2" />
      </h1>

      <div className="flex flex-row-reverse w-full">
        <ChatRecordButton />
      </div>
    </section>
  )
}

export default ChatHeader
