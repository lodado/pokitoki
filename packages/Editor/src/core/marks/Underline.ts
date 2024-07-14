import { toggleMark } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import { DOMOutputSpec } from 'prosemirror-model'

import BaseMark from './BaseMark'

export default class Underline extends BaseMark {
  get name(): string {
    return 'underline'
  }

  get createSchema() {
    return {
      parseDOM: [{ tag: 'u' }],
      toDOM() {
        return ['u', 0] satisfies DOMOutputSpec
      },
    }
  }

  inputRules(): InputRule[] {
    return [
      new InputRule(/(?:_)([^_]+)(?:_)$/, (state, match, start, end) => {
        const { tr } = state

        if (match[1]) {
          tr.replaceWith(start - 1, end, this.schema.text(match[1], [this.schema.marks.underline.create()]))
        }
        return tr
      }),
    ]
  }

  keys() {
    return {
      'Mod-u': toggleMark(this.type),
    }
  }

  commands() {
    return (attrs: {}) => toggleMark(this.type, attrs)
  }
}
