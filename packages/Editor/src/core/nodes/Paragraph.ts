import { setBlockType } from 'prosemirror-commands'
import { NodeSpec, NodeType } from 'prosemirror-model'
import { Command, Plugin, TextSelection } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

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

  plugins() {
    return [
      ...super.plugins(),
      new Plugin({
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = []
            const { doc } = state

            doc.descendants((node, pos) => {
              if (node.type.name === this.name && node.content.size === 0) {
                const widget = document.createElement('span')
                widget.className = 'editor-placeholder'
                widget.textContent = 'Type something...'

                decorations.push(Decoration.widget(pos + 1, widget, { side: -1 }))
              }
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  }
}
