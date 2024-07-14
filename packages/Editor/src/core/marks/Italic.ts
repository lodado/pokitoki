import { toggleMark } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import { DOMOutputSpec } from 'prosemirror-model'

import BaseMark from './BaseMark'

export default class Italic extends BaseMark {
  get name(): string {
    return 'italic'
  }

  get createSchema() {
    return {
      parseDOM: [
        { tag: 'i' },
        { tag: 'em', getAttrs: (node: HTMLElement) => node.style.fontStyle !== 'normal' && null },
      ],
      toDOM() {
        return ['em', 0] satisfies DOMOutputSpec
      },
    }
  }

  /** Bold와 혼용되지 않게 조심 */
  inputRules(): InputRule[] {
    return [
      new InputRule(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/, (state, match, start, end) => {
        const { tr } = state

        if (match[1]) {
          tr.replaceWith(start - 1, end, this.schema.text(match[1], [this.type.create()]))
        }
        return tr
      }),
    ]
  }

  keys() {
    return {
      'Mod-i': toggleMark(this.type),
      'Mod-I': toggleMark(this.type),
    }
  }

  commands() {
    return (attrs: {}) => toggleMark(this.type, attrs)
  }
}
