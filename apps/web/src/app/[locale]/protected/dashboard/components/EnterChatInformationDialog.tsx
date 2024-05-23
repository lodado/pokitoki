'use client'

import { AlertDialog } from '@custompackages/designsystem'
import React from 'react'

import { useI18n } from '@/lib/i18n'
import { useAtom, useAtomValue, useResetAtom } from '@/lib/jotai'
import { chatInformationDialogAtom } from '@/store'

import useThreadManager from './useThreadManager'

const EnterChatInformationDialog = () => {
  const t = useI18n('ENTERDIALOG')

  const [chatInformationDialog, setChatInformationDialog] = useAtom(chatInformationDialogAtom)
  const resetChatInformationDialog = useResetAtom(chatInformationDialogAtom)

  const { state, chatDialogDescription } = chatInformationDialog
  const isDialogOpen = state !== 'UNMOUNT'
  const { header, body } = chatDialogDescription

  const onChangeVisible = (newVisibleState: boolean) => {
    setChatInformationDialog((oldData) => {
      return { ...oldData, state: newVisibleState ? oldData.state : 'UNMOUNT' }
    })
  }

  const { handleEnterDialog } = useThreadManager()

  return (
    <AlertDialog isVisible={isDialogOpen} onChangeVisible={onChangeVisible}>
      <AlertDialog.Header>{header}</AlertDialog.Header>
      <AlertDialog.Body>{body}</AlertDialog.Body>

      <AlertDialog.SubmitForm
        submitText={t('SUBMITTEXT')}
        cancelText={t('CANCELTEXT')}
        onSubmit={async (e) => {
          await handleEnterDialog()
        }}
        onClose={() => {
          resetChatInformationDialog()
        }}
      />
    </AlertDialog>
  )
}

export default EnterChatInformationDialog
