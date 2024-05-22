'use client'

import { AlertDialog } from '@custompackages/designsystem'
import React from 'react'

import { useThreadManager, useUrl } from '@/hooks'
import { useI18n } from '@/lib/i18n'
import { useAtom, useAtomValue, useResetAtom } from '@/lib/jotai'
import { chatDialogDescriptionAtom, chatInformationDialogAtom, doesChatInformationDialogOpenAtom } from '@/store'

const EnterChatInformationDialog = () => {
  const t = useI18n('ENTERDIALOG')
  const [chatDescription, setChatDescription] = useAtom(chatDialogDescriptionAtom)
  const [isVisible, setVisible] = useAtom(doesChatInformationDialogOpenAtom)
  const chatInformationDialog = useAtomValue(chatInformationDialogAtom)
  const resetChatInformation = useResetAtom(chatInformationDialogAtom)
  const resetChatDescription = useResetAtom(chatDialogDescriptionAtom)

  const { createAndEnterThread } = useThreadManager()

  const { header, body } = chatDescription

  const handleCreateAndEnterThread = async () => {
    const { assistantId, description } = chatInformationDialog
    const { category } = chatDescription

    createAndEnterThread({ assistantId, description, category })
  }

  return (
    <AlertDialog isVisible={isVisible} onChangeVisible={setVisible}>
      <AlertDialog.Header>{header}</AlertDialog.Header>
      <AlertDialog.Body>{body}</AlertDialog.Body>

      <AlertDialog.SubmitForm
        submitText={t('SUBMITTEXT')}
        cancelText={t('CANCELTEXT')}
        onSubmit={async (e) => {
          await handleCreateAndEnterThread()
        }}
        onClose={() => {
          resetChatInformation()
          resetChatDescription()
        }}
      />
    </AlertDialog>
  )
}

export default EnterChatInformationDialog
