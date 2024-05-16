'use client'

import { contextBuildHelper, noop } from '@custompackages/shared'
import React, { Dispatch, FormEvent, ReactComponentElement, ReactElement, ReactNode, useEffect, useState } from 'react'

import { Close, Content, Overlay, Portal, Root, Trigger } from './radix'

const [DialogProvider, useDialogContext] = contextBuildHelper<{
  isDialogVisible: boolean
  onChangeVisibleStatus: (newVisibleStatus: boolean) => void
}>({ id: 'dialog' })

const DialogClose = () => {
  return (
    <Close asChild>
      <button type="button" className="IconButton" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Dismiss">
            <path
              id="Shape"
              d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569L4.14645 4.14645L4.08859 4.21569Z"
              fill="#3D3D3D"
            />
          </g>
        </svg>
      </button>
    </Close>
  )
}

const DialogRoot = ({ children }: { children: ReactNode }) => {
  const { isDialogVisible, onChangeVisibleStatus } = useDialogContext()

  return (
    <Root open={isDialogVisible} onOpenChange={onChangeVisibleStatus}>
      {children}
    </Root>
  )
}

const DialogTrigger = ({ children }: { children: ReactNode }) => {
  return <Trigger>{children}</Trigger>
}

const DialogContent = ({ children }: { children: ReactNode }) => {
  return (
    <Portal>
      <Overlay className="fixed inset-0" />
      <Content className="fixed -translate-x-1/2 -translate-y-1/2 dialog-content z-dialog top-2/4 left-2/4">
        {children}
      </Content>
    </Portal>
  )
}

/**
 * Properties for the SubmitForm component.
 *
 * This interface defines the props needed to handle form submission, including the children to be rendered within the form,
 * a submission handler, optional custom styling, and an error handler.
 */
export interface SubmitFormProps {
  /**
   * The children nodes to be rendered within the form. This can include any form elements such as inputs, labels,
   * and buttons, or other React nodes that form the content of the submission form.
   */
  children: ReactNode

  /**
   * The event handler function that is called when the form is submitted.
   *
   * This function should be an asynchronous operation (returning a Promise) that handles the form submission logic,
   * such as validating the form data and sending it to a server. The function receives the form event, allowing
   * for custom handling like preventing the default form submission behavior.
   *
   * @param event - The form event triggered upon form submission.
   */
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>

  onClose?: () => void

  /**
   * An optional CSS class name to apply to the form for styling purposes. This allows for custom styling of the
   * form element, making it possible to adapt the appearance of the form to match the rest of the application's design.
   */
  className?: string

  /**
   * An optional error handler function that is called if an error occurs during form submission. This provides a way
   * to handle submission errors, such as displaying error messages to the user or logging the error for debugging purposes.
   *
   * @param error - The error object or message encountered during the submission process.
   */
  onError?: (error: unknown) => void
}

const SubmitForm = ({ className, children, onSubmit, onClose = noop, onError = noop }: SubmitFormProps) => {
  const { isDialogVisible, onChangeVisibleStatus } = useDialogContext()

  const handleDialogSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      await onSubmit(event)
    } catch (error) {
      onError(error)
    } finally {
      onChangeVisibleStatus(false)
    }
  }

  useEffect(() => {
    return () => {
      if (!isDialogVisible) {
        onClose()
      }
    }
  }, [isDialogVisible])

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        handleDialogSubmit(event)
      }}
    >
      {children}
    </form>
  )
}

/**
 * Properties for the Dialog component.
 */
export interface DialogProps {
  /**
   * The children nodes to be rendered within the dialog. This can be any valid
   * React Node (e.g., elements, strings, fragments, or an array of these types).
   */
  children: ReactNode

  /**
   * A boolean indicating whether the dialog is currently visible.
   * If not provided, the dialog visibility will be managed internally or by parent components.
   * Defaults to `false` if not specified.
   */
  isVisible?: boolean

  /**
   * An optional callback function that is called when the visibility of the dialog needs to change.
   * This allows parent components to control the visibility state of the dialog.
   *
   * @param newVisibleStatus - The new visibility state (true for visible, false for hidden) that should be applied to the dialog.
   */
  onChangeVisible?: (newVisibleStatus: boolean) => void
}

export const Dialog = ({ isVisible = undefined, onChangeVisible, children }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const isDialogVisible = isVisible ?? open
  const handleChangeVisibleStatus = (newVisibleStatus: boolean) => {
    if (onChangeVisible) {
      onChangeVisible(newVisibleStatus)

      return
    }

    setOpen(newVisibleStatus)
  }

  return (
    <DialogProvider isDialogVisible={isDialogVisible} onChangeVisibleStatus={handleChangeVisibleStatus}>
      {children}
    </DialogProvider>
  )
}

Dialog.displayName = 'Dialog'

Dialog.Root = DialogRoot
Dialog.Trigger = DialogTrigger
Dialog.SubmitForm = SubmitForm
Dialog.Content = DialogContent
Dialog.Close = DialogClose

export { DialogProvider, useDialogContext }
