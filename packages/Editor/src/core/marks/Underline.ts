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
        return this.updateMark(state, match, start - 1, end)
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
