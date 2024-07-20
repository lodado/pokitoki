import { Node as ProsemirrorNode, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, EditorState, Plugin, Transaction } from 'prosemirror-state'

import BaseNode from '../BaseNode' // BaseNode가 저장된 파일의 경로를 지정하세요.

export default class ProseImage extends BaseNode {
  get name() {
    return 'image'
  }

  get createSchema(): NodeSpec {
    return {
      inline: true,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
        width: { default: 'auto' },
        height: { default: 'auto' },
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: (dom) => ({
            src: dom.getAttribute('src'),
            alt: dom.getAttribute('alt'),
            title: dom.getAttribute('title'),
            width: dom.style.width || 'auto',
            height: dom.style.height || 'auto',
          }),
        },
      ],
      toDOM: (node) => ['img', { ...node.attrs }],
    }
  }

  inputRules() {
    return []
  }

  handleInsertImage = (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { selection } = state
    const { $from, $to } = selection
    const position = $from.pos

    if (selection.empty) {
      const node = this.type.create({
        src: 'https://via.placeholder.com/150',
        alt: 'Placeholder Image',
        title: 'Placeholder Image',
      })
      const transaction = state.tr.insert(position, node)
      dispatch?.(transaction)
      return true
    }

    return false
  }

  keys() {
    return {
      'Ctrl-Space': this.handleInsertImage,
    }
  }

  plugins() {
    return [
      ...super.plugins(),

      new Plugin({
        props: {
          nodeViews: {
            // image: (node, view, getPos) => {
            //   return new ImageNodeView(node, view, () => getPos() ?? 0)
            // },
          },
        },
      }),
    ]
  }
}
