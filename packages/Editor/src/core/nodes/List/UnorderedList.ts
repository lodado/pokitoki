import { setBlockType, wrapIn } from 'prosemirror-commands'
import { wrappingInputRule } from 'prosemirror-inputrules'
import { Node as ProsemirrorNode, NodeRange, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { liftListItem, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list'
import { EditorState, Transaction } from 'prosemirror-state'
import { findWrapping } from 'prosemirror-transform'

import BaseNode from '../BaseNode'
import Indent from '../Indent'
import Paragraph from '../Paragraph'
import BulletList from './BulletList'

export default class UnorderedList extends BaseNode {
  paragraph: Paragraph
  bulletList: BulletList
  indent: Indent

  constructor({ paragraph, bulletList, indent }: { indent: Indent; paragraph: Paragraph; bulletList: BulletList }) {
    super()
    this.paragraph = paragraph
    this.bulletList = bulletList
    this.indent = indent
  }

  get name(): string {
    return 'ul'
  }

  get createSchema(): NodeSpec {
    return {
      content: `${this.bulletList.name}+`,
      group: 'block',
      parseDOM: [{ tag: 'ul' }],
      toDOM: () => ['ul', 0],
    }
  }

  toggleList = (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const nodesToReplace: ProsemirrorNode[] = []

    const { $from, $to } = state.selection
    let isInListContainer = false
    let transaction = state.tr

    let startPos: number | null = null
    let endPos: number | null = null

    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type === this.type) {
        isInListContainer = true
        return false
      }

      if (node.type === this.paragraph.type) {
        if (startPos === null) {
          startPos = pos
        }
        endPos = pos + node.nodeSize

        nodesToReplace.push(node)
      }

      return true
    })

    if (isInListContainer) return true

    if (nodesToReplace.length > 0 && startPos !== null && endPos !== null) {
      const newListNode = this.type.create(
        null,
        nodesToReplace.map((node) => this.bulletList.type.create(null, this.paragraph.type.create(null, node.content))),
      )
      transaction = transaction.replaceRangeWith(startPos, endPos, newListNode)
    }

    // Apply the transaction
    dispatch(transaction.scrollIntoView())

    return true
  }

  handleTabKey = (state: EditorState, dispatch: (tr: Transaction) => void) => {
    return false
    // return true
  }

  inputRules() {
    return [wrappingInputRule(/^\s*([-+*])\s$/, this.type)]
  }

  keys() {
    return {
      'Ctrl-Shift-8': this.toggleList,
      Tab: this.handleTabKey,
    }
  }
}
