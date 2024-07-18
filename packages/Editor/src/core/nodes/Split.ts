import { exitCode } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { Fragment, NodeSpec, NodeType, Schema, Slice } from 'prosemirror-model'
import { EditorState, Plugin, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import BaseNode from './BaseNode'

export default class SplitScreen extends BaseNode {
  get name() {
    return 'split_screen'
  }

  get createSchema(): NodeSpec {
    return {
      content: 'block+',
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

  private handleDrop = (view: EditorView, event: Event, slice: Slice, moved: boolean) => {
    // Check if more than one block is being dragged
    let blockCount = 0
    slice.content.forEach((node) => {
      if (node.isBlock) blockCount += 1
    })

    // Check if the drop target is a split_screen node
    // @ts-ignore
    const target = view.posAtCoords({ left: event.clientX, top: event.clientY })
    if (target) {
      const $target = view.state.doc.resolve(target.pos)

      let { depth } = $target

      while (depth > 0) {
        const targetNode = $target.node(depth)
        if (targetNode.type === this.type && blockCount > 1) {
          event.preventDefault()

          alert('only one block can be moved into split layout')
          return true
        }

        depth -= 1
      }
    }

    return false
  }

  private toggleSplitScreen = (state: EditorState, dispatch?: (tr: Transaction) => void) => {
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

      const splitNode = this.type.create({ orientation: newOrientation }, [
        paragraph.create({}, firstHalf),
        paragraph.create({}, secondHalf),
      ])
      tr.replaceRangeWith(from - $pos.parentOffset, to + node.nodeSize - $pos.parentOffset, splitNode)
      dispatch(tr)

      return true
    }

    return false
  }

  private handleEnterInterrupted = (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { selection } = state
    const { $from } = selection

    let node = $from.node()
    let { depth } = $from

    while (depth > 0) {
      if (node.type.name === this.name) {
        return true
      }
      depth -= 1
      node = $from.node(depth)
    }

    return false
  }

  private handleBackspace = (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { selection } = state
    const { $from } = selection

    const { pos } = $from

    const resolvedPos = state.doc.resolve(pos - 1)
    if (resolvedPos?.nodeBefore?.type === this.type) return true

    return false
  }

  keys() {
    return {
      'Ctrl-Shift-S': this.toggleSplitScreen,
      Enter: this.handleEnterInterrupted,
      Backspace: this.handleBackspace,
    }
  }

  plugins(): Plugin[] {
    return [
      ...super.plugins(),
      new Plugin({
        props: {
          handleDrop: this.handleDrop,
        },
      }),
    ]
  }
}
