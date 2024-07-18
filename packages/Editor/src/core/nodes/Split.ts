import { keymap } from 'prosemirror-keymap'
import { Fragment, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { EditorState, Plugin, Transaction } from 'prosemirror-state'

import BaseNode from './BaseNode'

const SplitId = 1

export default class SplitScreenNode extends BaseNode {
  get name() {
    return 'split_screen'
  }

  get createSchema(): NodeSpec {
    return {
      content: 'block*',
      group: 'block',
      defining: true,
      attrs: {
        orientation: { default: 'vertical' },
      },
      parseDOM: [
        {
          tag: 'div.split-screen',
          getAttrs: (dom) => ({ orientation: dom.className.includes('horizontal') ? 'horizontal' : 'vertical' }),
        },
      ],
      toDOM: (node) => {
        return [
          'div',
          { style: 'position: relative' },
          ['div', { class: `split-screen ${node.attrs.orientation}` }, 0], // 콘텐츠 홀을 별도의 컨테이너에 넣음
        ]
      },
    }
  }

  toggleSplitScreen = (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { selection, tr } = state
    const { from, to, $from } = selection
    const { paragraph } = state.schema.nodes
    const $pos = state.doc.resolve(from)
    const node = $pos.node($pos.depth) // 현재 노드
    const parentNode = $pos.node(-1)

    const { orientation } = parentNode.attrs
    const newOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical'

    if (dispatch) {
      const { content } = node

      const firstHalf = content.cut(0, content.size)
      const secondHalf = content.cut(content.size, content.size)

      const splitNode = state.schema.nodes.split_screen.create({ orientation: newOrientation }, [
        paragraph.create({}, firstHalf),
        paragraph.create({}, secondHalf),
      ])
      tr.replaceRangeWith(from - $pos.parentOffset, to + node.nodeSize - $pos.parentOffset, splitNode)
      dispatch(tr)

      return true
    }

    return false
  }

  keys() {
    return {
      'Ctrl-Shift-S': this.toggleSplitScreen,
    }
  }

  plugins(): Plugin[] {
    return super.plugins()
  }
}
