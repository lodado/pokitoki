'use client'

import { Card } from '@custompackages/designsystem'
import React, { ComponentProps, useEffect } from 'react'

import { useAtom, useResetAtom, useSetAtom } from '@/lib/jotai'
import { TopicConversation } from '@/server/service/conversation/topic/type'
import {
  ChatDialogDescription,
  chatDialogDescriptionAtom,
  chatInformationDialogAtom,
  doesChatInformationDialogOpenAtom,
} from '@/store'

const ThreadEntranceCard = (
  props: ComponentProps<typeof Card> & {
    assistantInfo: TopicConversation
    chatDialogDescription: ChatDialogDescription
  },
) => {
  const { assistantInfo, chatDialogDescription, ...rest } = props

  const setChatInformationDialogOpen = useSetAtom(doesChatInformationDialogOpenAtom)
  const setChatDescription = useSetAtom(chatDialogDescriptionAtom)
  const [chatInformationDialog, setChatInformationDialog] = useAtom(chatInformationDialogAtom)

  const { id } = chatInformationDialog

  const isCurrentCardChecked = id === assistantInfo.id

  return (
    <Card
      {...rest}
      isSelected={isCurrentCardChecked}
      onClick={() => {
        setChatInformationDialogOpen(true)
        setChatInformationDialog(assistantInfo)
        setChatDescription(chatDialogDescription)
      }}
    />
  )
}

export default ThreadEntranceCard
