import { inputRules, textblockTypeInputRule } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { DOMOutputSpec, Node, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, EditorState, Plugin, Selection, Transaction } from 'prosemirror-state'

import BaseNode from './BaseNode'

export default class Heading extends BaseNode {
  className = 'heading-name'

  get name() {
    return 'heading'
  }

  get defaultOptions() {
    return {
      levels: [1, 2, 3, 4],
      collapsed: undefined,
    }
  }

  get createSchema() {
    return {
      attrs: {
        level: {
          default: 1,
        },
      },
      content: '(text)*',
      group: 'block',
      defining: true,
      parseDOM: this.defaultOptions.levels.map((level) => ({
        tag: `h${level}`,
        getAttrs: () => ({ level }),
      })),
      toDOM: (node: Node) => [`h${node.attrs.level}`, 0] satisfies DOMOutputSpec,
    }
  }

  commands() {
    return (attrs: { level: number }) =>
      (state: EditorState, dispatch: (tr: Transaction) => void = () => {}) => {
        const { $from, $to } = state.selection

        if (dispatch) {
          dispatch(state.tr.setBlockType($from.pos, $to.pos, this.type, attrs))
        }

        return true
      }
  }

  inputRules() {
    return this.defaultOptions.levels.map((level: number) =>
      textblockTypeInputRule(new RegExp(`^(#{1,${level}})\\s$`), this.type, () => ({
        level,
      })),
    )
  }

  keys() {
    return this.defaultOptions.levels.reduce(
      (items, level) => ({
        ...items,
        [`Shift-Ctrl-${level}`]: this.commands()({ level }),
      }),
      {},
    )
  }

  plugins() {
    return super.plugins()
  }
}
