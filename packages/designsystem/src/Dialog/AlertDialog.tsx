import { Slot } from '@radix-ui/react-slot'
import React, { ReactNode } from 'react'

import { Button } from '../Button'
import { cn } from '../utils'
import { Dialog, SubmitFormProps, useDialogContext } from './components/compound'
import { Title } from './components/radix'
import { DialogTemplate, DialogTemplateProps } from './DialogTemplate'

interface DialogSubmitFormProps extends Omit<SubmitFormProps, 'children'> {
  submitText: string
  cancelText: string
}

const SubmitForm = ({ submitText, cancelText, onSubmit, onError }: DialogSubmitFormProps) => {
  const { onChangeVisibleStatus } = useDialogContext()

  return (
    <Dialog.SubmitForm className="flex flex-col w-full mt-2" onSubmit={onSubmit} onError={onError}>
      <Button className="w-full mb-2" type="submit" size="medium" variant="primary">
        {submitText}
      </Button>
      <Button
        className="w-full"
        onClick={() => onChangeVisibleStatus(false)}
        type="button"
        size="medium"
        variant="secondary"
      >
        {cancelText}
      </Button>
    </Dialog.SubmitForm>
  )
}

const DialogHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <Title className="flex flex-row justify-between w-full mb-3 text-text-01 heading-04 ">
      {children}
      <Dialog.Close />
    </Title>
  )
}

const DialogBody = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={cn('flex w-full py-2 grow body-02-r', className)}>{children}</div>
}

/**
 * Properties for the AlertDialog component.
 *
 * This interface extends `DialogTemplateProps` and `SubmitFormProps` by inheriting all their properties
 * except for `children`, which is explicitly redefined here. It's designed to create alert dialogs
 * that can optionally submit data, displaying a consistent interface while allowing for customization
 * and functionality extension.
 */
export interface AlertDialogProps extends Omit<DialogTemplateProps, 'children'> {
  /**
   * The children nodes to be rendered within the body of the alert dialog. This can include messages,
   * forms, or any other React nodes appropriate for the dialog's content.
   */
  children: ReactNode
}

export const AlertDialog = ({ Trigger, isVisible, onChangeVisible, children }: AlertDialogProps) => {
  return (
    <DialogTemplate isVisible={isVisible} onChangeVisible={onChangeVisible} Trigger={Trigger}>
      <div className="flex-col p-6 border-solid rounded-lg bg-surface-up border-1 border-border-01 w-80 shadow-card-01">
        {children}
      </div>
    </DialogTemplate>
  )
}

AlertDialog.Header = DialogHeader
AlertDialog.Body = DialogBody
AlertDialog.SubmitForm = SubmitForm

AlertDialog.displayName = 'dialog'
