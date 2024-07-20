import { Node } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { createSchema } from '../../schema/schema'
import { createState } from '../../state'

export function loadDocument(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) {
  const json = JSON.parse(localStorage.getItem('prosemirror-document')!)

  if (json) {
    const doc = Node.fromJSON(createSchema(), json)

    const newState = createState({ getDoc: (schema) => doc })

    view!.updateState(newState)

    view!.setProps({
      editable: () => false,
    })

    return true
  }

  return false
}
