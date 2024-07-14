import { toggleMark } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import { MarkSpec } from 'prosemirror-model'

import BaseMark from './BaseMark'

const CODE_STYLE =
  'font-weight: bold; line-height: normal; background: rgba(135,131,120,.15); color: #EB5757; border-radius: 4px; font-size: 85%; padding: 0.2em 0.4em;'

export default class InlineCodeSnippet extends BaseMark {
  get name() {
    return 'inlineCodeSnippet'
  }

  get createSchema(): MarkSpec {
    return {
      parseDOM: [{ tag: 'span.code' }],
      toDOM: () => ['span', { class: 'code', style: CODE_STYLE }, 0],
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
