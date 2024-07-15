import { toggleMark } from 'prosemirror-commands'
import { InputRule, inputRules, textblockTypeInputRule } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { DOMOutputSpec, Node as ProsemirrorNode, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, EditorState, Plugin, Transaction } from 'prosemirror-state'

import BaseNode from '../BaseNode'
import CodeMirrorView from './CodeMirrorView'

export default class CodeMirrorNode extends BaseNode {
  codeMirror!: CodeMirrorView

  get name() {
    return 'codeMirror'
  }

  get createSchema() {
    return {
      group: 'block',
      content: 'text*',
      marks: '',
      code: true,
      defining: true,
      isolating: true,
      parseDOM: [
        {
          tag: 'pre',
          preserveWhitespace: 'full' as const,
          getAttrs: (node: HTMLElement) => (node.classList.contains('code-mirror') ? null : false),
        },
      ],
      toDOM: () => ['pre', { class: 'code-mirror' }, ['code', 0]] satisfies DOMOutputSpec,
    }
  }

  plugins() {
    const plugins = super.plugins()

    return [
      ...plugins,
      new Plugin({
        props: {
          nodeViews: {
            codeMirror: (node, view, getPos) => {
              this.codeMirror = new CodeMirrorView(node, view, getPos)

              return this.codeMirror
            },
          },

          handleKeyDown: (view, event) => {
            if (event.key === 'Backspace') {
              const { state, dispatch } = view
              const { selection } = state
              const { $from, empty } = selection

              if (empty) {
                const { nodeBefore } = $from
                const node = $from.node()

                if (node && this.codeMirror?.isEmpty() && node.type.name === 'codeMirror') {
                  const tr = state.tr.delete(Math.max($from.pos - node.nodeSize, 0), $from.pos)
                  dispatch(tr)
                  return true
                }
              }
            }
            return false
          },
        },
      }),
    ]
  }
  inputRules() {
    return [textblockTypeInputRule(/\/code$/, this.type)]
  }

  toggleCode(attrs: {}) {
    return (state: EditorState, dispatch?: (tr: Transaction) => void) => {
      const { $from, $to } = state.selection

      if (dispatch) {
        dispatch(state.tr.setBlockType($from.pos, $to.pos, this.type, attrs))
      }

      return true
    }
  }

  keys() {
    return {
      'Mod-C`': (state: EditorState, dispatch?: (tr: Transaction) => void) => this.toggleCode({})(state, dispatch), // 단축키 예시로, 필요에 맞게 수정
    }
  }
}
