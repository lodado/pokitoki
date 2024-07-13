import { splitBlock } from 'prosemirror-commands'
import { Command, EditorState, Transaction } from 'prosemirror-state'

export function customShiftEnter(state: EditorState, dispatch: (tr: Transaction) => void = () => {}) {
  if (!state.selection.empty) return false

  // shift+enter를 쳤을 때 새로운 블록 생성
  return splitBlock(state, dispatch)
}
