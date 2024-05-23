'use client'

import { Card } from '@custompackages/designsystem'
import React, { ComponentProps, useEffect } from 'react'

import { useAtom } from '@/lib/jotai'
import { TopicConversation } from '@/server/repository/conversation/topic/type'
import { ChatDialogDescription, chatInformationDialogAtom } from '@/store'

const ThreadEntranceCard = (
  props: ComponentProps<typeof Card> & {
    assistantInfo: TopicConversation
    chatDialogDescription: ChatDialogDescription
  },
) => {
  const { assistantInfo, chatDialogDescription, ...rest } = props
  const [chatInformationDialog, setChatInformationDialog] = useAtom(chatInformationDialogAtom)

  const { id } = chatInformationDialog.topic
  const isCurrentCardChecked = id === assistantInfo.id

  return (
    <Card
      {...rest}
      isSelected={isCurrentCardChecked}
      onClick={() => {
        setChatInformationDialog({
          state: 'CREATE_AND_ENTER',
          topic: assistantInfo,
          chatDialogDescription,
        })
      }}
    />
  )
}

export default ThreadEntranceCard
