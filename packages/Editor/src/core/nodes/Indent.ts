import { wrapIn } from 'prosemirror-commands'
import { NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, Plugin, TextSelection } from 'prosemirror-state'

import BaseNode from './BaseNode'

const INDENT = 2

export default class Indent extends BaseNode {
  get name() {
    return 'indent'
  }

  get createSchema(): NodeSpec {
    return {
      content: 'block*',
      group: 'block',
      attrs: {
        indent: { default: INDENT },
      },
      parseDOM: [
        {
          tag: 'div',
          getAttrs: (dom) => ({
            indent: Number(dom.style.marginLeft ?? 0) > 0 ? parseInt(dom.style.marginLeft, 10) / 2 : 0,
          }),
        },
      ],
      toDOM: (node) => ['div', { style: `padding-left: ${node.attrs.indent}em` }, 0],
    }
  }

  wrapIndentCommand(): Command {
    return (state, dispatch) => {
      const { schema, selection } = state
      const { from, to } = selection
      let { tr } = state

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type === this.type) {
          const currentIndent = INDENT
          tr = tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: currentIndent })
        }
      })

      const divType = this.type
      if (!divType) return false

      if (dispatch) {
        tr = tr.wrap(selection.$from.blockRange(selection.$to)!, [
          { type: divType, attrs: { indent: tr.selection.$from.nodeAfter?.attrs.indent || INDENT } },
        ])
        dispatch(tr)
      }

      return true
    }
  }

  unindentCommand(): Command {
    return (state, dispatch) => {
      const { selection } = state
      const { $from } = selection
      const parentNode = $from.node(-1)
      const node = $from.node()

      // 현재 노드가 indent 내부에 있는지 확인
      if (parentNode.type === this.type) {
        const grandParentNode = $from.node(-2)
        const parentPos = $from.before(-1)
        const newPos = parentPos

        let { tr } = state

        // 부모 노드에서 현재 노드를 삭제
        tr = tr.delete($from.start(-1), $from.end(-1))

        const arr: any[] = []

        // 모든 자식 노드를 새로운 위치에 삽입
        parentNode.content.forEach((child, offset) => {
          arr.push(child)
        })

        arr.reverse().forEach((child) => {
          tr = tr.insert(newPos, child)
        })

        if (dispatch) {
          dispatch(tr)
        }
      }

      return true
    }
  }

  handleBackspace(): Command {
    return (state, dispatch, view) => {
      const { selection } = state
      const { $cursor } = selection as TextSelection
      if ($cursor && $cursor.pos === $cursor.start()) {
        const { $from } = selection
        const node = $from.node()
        if (node.type === this.type && node.attrs.indent > 0) {
          const currentIndent = node.attrs.indent
          const tr = state.tr.setNodeMarkup($from.before(), undefined, { ...node.attrs, indent: currentIndent - 1 })
          if (dispatch) {
            dispatch(tr)
          }
          return true
        }
      }
      return false
    }
  }

  keys(): Record<string, Command> {
    return {
      Tab: this.wrapIndentCommand(),
      'Shift-Tab': this.unindentCommand(),
      Backspace: this.handleBackspace(),
    }
  }
}
