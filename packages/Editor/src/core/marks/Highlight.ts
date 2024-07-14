import { toggleMark } from 'prosemirror-commands'
import { DOMOutputSpec, MarkSpec } from 'prosemirror-model'

import BaseMark from './BaseMark'

class HighlightMark extends BaseMark {
  get name(): string {
    return 'highlight'
  }

  get createSchema() {
    return {
      attrs: { color: { default: 'yellow' } },
      parseDOM: [
        {
          tag: 'span[style]',
          getAttrs: (dom: HTMLElement) => (dom.style.backgroundColor ? { color: dom.style.backgroundColor } : null),
        },
      ],
      toDOM(node: MarkSpec) {
        return ['span', { style: `background-color: ${node.attrs?.color}` }, 0] satisfies DOMOutputSpec
      },
    }
  }

  commands() {
    return (attr: { color?: string }) => toggleMark(this.type, attr)
  }
}
