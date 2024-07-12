import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { RefObject } from 'react'

export const createView = ({ editor, state }: { editor: HTMLElement; state: EditorState }) => {
  const view = new EditorView(editor, {
    state,

    dispatchTransaction(transaction: Transaction) {
      const newState = view.state.apply(transaction)
      view.updateState(newState)
    },
  })

  return view
}
