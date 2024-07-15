import { setBlockType, wrapIn } from 'prosemirror-commands'
import { NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, Plugin, TextSelection } from 'prosemirror-state'

import BaseNode from './BaseNode'

export default class Paragraph extends BaseNode {
  get name() {
    return 'paragraph'
  }

  get createSchema(): NodeSpec {
    return {
      content: 'inline*',
      group: 'block',
      attrs: {
        indent: { default: 0 },
      },
      parseDOM: [
        {
          tag: 'p',
        },
      ],
      toDOM: (node) => ['p', 0],
    }
  }

  keys(): Record<string, Command> {
    return {
      'Shift-Ctrl-0': setBlockType(this.type),
    }
  }
}
