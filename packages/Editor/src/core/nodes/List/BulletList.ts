import { setBlockType, wrapIn } from 'prosemirror-commands'
import { wrappingInputRule } from 'prosemirror-inputrules'
import { Node as ProsemirrorNode, NodeRange, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { liftListItem, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list'

import BaseNode from '../BaseNode'
import Paragraph from '../Paragraph'

export default class BulletList extends BaseNode {
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
      content: 'block*',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'li' }],
      toDOM: () => ['li', 0],
    }
  }
}
