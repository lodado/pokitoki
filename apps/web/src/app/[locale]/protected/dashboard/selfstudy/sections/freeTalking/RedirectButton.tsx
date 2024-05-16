'use client'

import { Button } from '@custompackages/designsystem'
import React, { ReactNode } from 'react'

import { useThreadManager } from '@/hooks'
import { useI18n } from '@/lib/i18n'
import { useAtom, useSetAtom } from '@/lib/jotai'
import { chatDialogDescriptionAtom, chatInformationDialogAtom, doesChatInformationDialogOpenAtom } from '@/store'

interface RedirectToFreeTalkingButtonProps {
  children: ReactNode
  className: string
}

const assistantId = 'asst_5ypeuMs1rQIPpRWF6YJwEJ9c'

/*
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
*/

const RedirectToFreeTalkingButton = ({ className, children }: RedirectToFreeTalkingButtonProps) => {
  const i18nLearn = useI18n('LEARN')
  const i18nEnterDialog = useI18n('ENTERDIALOG')

  const setChatInformationDialogOpen = useSetAtom(doesChatInformationDialogOpenAtom)
  const setChatDescription = useSetAtom(chatDialogDescriptionAtom)
  const [chatInformationDialog, setChatInformationDialog] = useAtom(chatInformationDialogAtom)

  return (
    <Button
      className={className}
      size="small"
      variant="primary"
      onClick={() => {
        setChatInformationDialogOpen(true)
        setChatInformationDialog({ id: 0, assistantId, description: '', title: '' })
        setChatDescription({
          header: i18nLearn('FREETALKING'),
          body: i18nEnterDialog('DIALOG-BODY'),
        })
      }}
    >
      {children}
    </Button>
  )
}

export default RedirectToFreeTalkingButton
