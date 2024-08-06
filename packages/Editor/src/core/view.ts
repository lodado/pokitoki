import { history, redoDepth, undoDepth } from 'prosemirror-history'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView, NodeViewConstructor } from 'prosemirror-view'

import CodeBlockView from './nodes/CodeMirror/CodeMirrorView'

interface CreateViewParams {
  editor: HTMLElement
  state: EditorState
}

export const createView = ({ editor, state }: CreateViewParams): EditorView => {
  const view = new EditorView(editor, {
    state,

    dispatchTransaction(transaction: Transaction): void {
      const newState = view.state.apply(transaction)
      view.updateState(newState)
    },
  })

  return view
}
