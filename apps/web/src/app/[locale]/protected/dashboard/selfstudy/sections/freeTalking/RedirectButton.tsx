'use client'

import { Button } from '@custompackages/designsystem'
import React, { ReactNode } from 'react'

import { useI18n } from '@/lib/i18n'
import { useSetAtom } from '@/lib/jotai'
import { chatInformationDialogAtom } from '@/store'

interface RedirectToFreeTalkingButtonProps {
  children: ReactNode
  className: string
}

const assistantId = 'asst_5ypeuMs1rQIPpRWF6YJwEJ9c'

const RedirectToFreeTalkingButton = ({ className, children }: RedirectToFreeTalkingButtonProps) => {
  const i18nLearn = useI18n('LEARN')
  const i18nEnterDialog = useI18n('ENTERDIALOG')

  const setChatInformationDialog = useSetAtom(chatInformationDialogAtom)

  return (
    <Button
      className={className}
      size="small"
      variant="primary"
      onClick={() => {
        setChatInformationDialog({
          state: 'CREATE_AND_ENTER',
          topic: {
            id: 0,
            assistantId,
            description: 'freeTalking~',
            title: 'free-talking',
          },
          chatDialogDescription: {
            header: i18nLearn('FREETALKING'),
            body: i18nEnterDialog('DIALOG-BODY'),
            category: 'free-talking',
          },
        })
      }}
    >
      {children}
    </Button>
  )
}

export default RedirectToFreeTalkingButton
