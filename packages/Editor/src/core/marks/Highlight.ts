import { toggleMark } from 'prosemirror-commands'
import { DOMOutputSpec, MarkSpec, MarkType } from 'prosemirror-model'
import { Command, EditorState, Transaction } from 'prosemirror-state'

import BaseMark from './BaseMark'

export default class Highlight extends BaseMark {
  get name(): string {
    return 'highlight'
  }

  get defaultOptions() {
    return {
      background: 'yellow',
      color: 'red',
    }
  }

  get createSchema() {
    return {
      attrs: {
        background: { default: this.defaultOptions.background },
        color: { default: this.defaultOptions.color },
      },
      parseDOM: [
        {
          tag: 'span[style]',
          getAttrs: (dom: HTMLElement) =>
            dom.style.backgroundColor || dom.style.color
              ? { background: dom.style.backgroundColor, color: dom.style.color }
              : null,
        },
      ],
      toDOM(node: MarkSpec) {
        return [
          'span',
          {
            style: `background-color: ${node.attrs?.background}; color: ${node.attrs?.color};`,
          },
          0,
        ] satisfies DOMOutputSpec
      },
    }
  }

  commands() {
    return (attr: { background?: string; color?: string }) => toggleMark(this.type, attr)
  }

  private toggleHighlightMark = (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const { schema, tr } = state
    const markType: MarkType = this.type
    const attrs = this.defaultOptions

    return toggleMark(markType, attrs)(state, dispatch)
  }

  keys() {
    return {
      'Mod-Ctrl-h': (state: EditorState, dispatch: (tr: Transaction) => void) =>
        this.toggleHighlightMark(state, dispatch),
      'Mod-Ctrl-H': (state: EditorState, dispatch: (tr: Transaction) => void) =>
        this.toggleHighlightMark(state, dispatch),
    }
  }
}
