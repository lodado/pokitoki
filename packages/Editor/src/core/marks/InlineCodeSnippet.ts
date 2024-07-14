import { toggleMark } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import { MarkSpec } from 'prosemirror-model'

import BaseMark from './BaseMark'

export default class InlineCodeSnippet extends BaseMark {
  get name() {
    return 'inlineCodeSnippet'
  }

  get createSchema(): MarkSpec {
    return {
      parseDOM: [{ tag: 'span.code' }],
      toDOM: () => ['span', { class: 'code' }, 0],
    }
  }

  inputRules(): InputRule[] {
    return [
      new InputRule(/`([^`]+)`$/, (state, match, start, end) => {
        const tr = this.updateMark(state, match, start, end)
        return tr
      }),
    ]
  }

  keys() {
    return {
      'Mod-`': toggleMark(this.type),
    }
  }

  commands() {
    return (attrs: any) => toggleMark(this.type, attrs)
  }
}
