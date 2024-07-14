import { toggleMark } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import { DOMOutputSpec, Mark, Node } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'

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
        return this.updateMark(state, match, start, end)
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
