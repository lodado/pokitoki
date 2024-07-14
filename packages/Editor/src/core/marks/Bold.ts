import { toggleMark } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import { DOMOutputSpec, Node } from 'prosemirror-model'

import BaseMark from './BaseMark'

export default class Bold extends BaseMark {
  get name() {
    return 'bold'
  }

  get createSchema() {
    return {
      parseDOM: [
        { tag: 'strong' },
        { tag: 'b', getAttrs: (node: HTMLElement) => node.style.fontWeight !== 'normal' && null },
      ],
      toDOM() {
        return ['strong', 0] satisfies DOMOutputSpec
      },
    }
  }

  inputRules() {
    return [
      new InputRule(/(?:\*\*)([^*]+)(?:\*\*)$/, (state, match, start, end) => {
        const { tr } = state

        if (match[1]) {
          tr.replaceWith(Math.max(start - 2, 1), end, this.schema.text(match[1], [this.type.create()]))
        }
        return tr
      }),
    ]
  }

  keys() {
    return {
      'Mod-b': toggleMark(this.type),
      'Mod-B': toggleMark(this.type),
    }
  }

  commands() {
    return (attrs: {}) => toggleMark(this.type, attrs)
  }
}
