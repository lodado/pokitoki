'use client'

import { AlertDialog, Dialog } from '@custompackages/designsystem'
import React from 'react'

import { useAtom } from '@/lib/jotai'
import { doesChatInformationDialogOpenAtom } from '@/store'

const EnterChatInformationDialog = () => {
  const [isVisible, setVisible] = useAtom(doesChatInformationDialogOpenAtom)

  return (
    <AlertDialog isVisible={isVisible} onChangeVisible={setVisible}>
      <AlertDialog.Header>Test</AlertDialog.Header>
      <AlertDialog.Body>Test Body</AlertDialog.Body>

      <AlertDialog.SubmitForm submitText="확인" cancelText="취소" onSubmit={async (e) => {}} />
    </AlertDialog>
  )
}

export default EnterChatInformationDialog
