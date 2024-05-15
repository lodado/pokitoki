'use client'

import { Card } from '@custompackages/designsystem'
import { useSetAtom } from 'jotai'
import React, { ComponentProps } from 'react'

import { TopicConversation } from '@/server/service/conversation/type'
import { chatInformationDialogAtom, doesChatInformationDialogOpenAtom } from '@/store'

const AssistantCard = (props: ComponentProps<typeof Card> & { assistantInfo: TopicConversation }) => {
  const { assistantInfo } = props

  const setChatInformationDialogOpen = useSetAtom(doesChatInformationDialogOpenAtom)
  const setChatInformationDialog = useSetAtom(chatInformationDialogAtom)

  return (
    <Card
      {...props}
      onClick={() => {
        console.log(assistantInfo)
        setChatInformationDialogOpen(true)
        setChatInformationDialog(assistantInfo)
      }}
    />
  )
}

export default AssistantCard
