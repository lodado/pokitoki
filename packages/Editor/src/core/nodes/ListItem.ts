import { setBlockType, wrapIn } from 'prosemirror-commands'
import { wrappingInputRule } from 'prosemirror-inputrules'
import { Node as ProsemirrorNode, NodeRange, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { liftListItem, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list'

import BaseNode from './BaseNode'
import Paragraph from './Paragraph'

export default class ListItem extends BaseNode {
  paragraph: Paragraph

  constructor({ paragraph }: { paragraph: Paragraph }) {
    super()
    this.paragraph = paragraph
  }

  get name(): string {
    return 'list_item2'
  }

  get createSchema(): NodeSpec {
    return {
      content: 'text*',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'li' }],
      toDOM: () => ['li', 0],
    }
  }
  toggleList = (state, dispatch) => {
    const { $from, $to, from, to } = state.selection
    const listType = this.type

    let transaction = state.tr
    const selectionStart = $from.pos
    const selectionEnd = $to.pos

    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type === this.paragraph.type) {
        const { content } = node

        if (content.size > 0) {
          transaction = transaction.replaceRangeWith(pos, pos + node.nodeSize, this.type.create(null, content))
        }
      }
    })

    transaction = transaction.wrap(state.selection.$from.blockRange(state.selection.$to)!, [
      { type: state.schema.nodes.indent, attrs: {} },
    ])

    // Apply the transaction
    dispatch(transaction.scrollIntoView())
    const newState = state.apply(transaction)

    // Restore the cursor position
    const newSelection = newState.selection.constructor.near(newState.doc.resolve(selectionEnd))
    dispatch(newState.tr.setSelection(newSelection).scrollIntoView())

    return true

    /*
    // Check if the current node is a list item
    if ($from.parent.type === listType) {
      const { content } = $from.parent

      const transaction = state.tr.replaceRangeWith(
        $from.start() - 1,
        $from.end() + 1,
        this.paragraph.type.create(null, content),
      )

      dispatch(transaction.scrollIntoView())
      return true
    }

    return wrapInList(listType)(state, dispatch)
    */
  }

  inputRules() {
    return [wrappingInputRule(/^\s*([-+*])\s$/, this.type)]
  }

  keys() {
    return {
      'Shift-Ctrl-8': this.toggleList,
    }
  }
}
