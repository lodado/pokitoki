import { Node as ProsemirrorNode, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, EditorState, Plugin, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

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
      toDOM: (node) => [
        'div',
        { style: 'position: relative;', 'data-image-id': `image-${node.attrs.id}` },

        [
          'div',
          { style: 'position: relative; width: max-content; height: max-content;' },
          [
            'img',
            {
              src: node.attrs.src,
              title: node.attrs.title,
              alt: node.attrs.alt,
              style: `width: ${node.attrs.width}; height: ${node.attrs.height};`,
            },
          ],
          [
            'div',
            {
              class: 'resize-handle',
              style:
                'width: 10px; height: 10px; background: gray; cursor: se-resize; position: absolute; right: 0px; bottom: 0px;',
            },
          ],
        ],
      ],
    }
  }

  inputRules() {
    return []
  }

  private handleImageResize(view: EditorView, event: MouseEvent) {
    const handle = event.target as HTMLElement
    const img = handle.previousSibling as HTMLElement
    const startX = event.clientX
    const startY = event.clientY

    const startWidth = parseInt(document.defaultView?.getComputedStyle(img).width || '0', 10)
    const startHeight = parseInt(document.defaultView?.getComputedStyle(img).height || '0', 10)

    const doDrag = (e: MouseEvent) => {
      img.style.width = `${startWidth + e.clientX - startX}px`
      img.style.height = `${startHeight + e.clientY - startY}px`
    }

    function stopDrag(e: MouseEvent) {
      document.documentElement.removeEventListener('mousemove', doDrag, false)
      document.documentElement.removeEventListener('mouseup', stopDrag, false)

      // 이미지 노드 업데이트
      const tr = view.state.tr.setNodeMarkup(view.state.selection.from, null, {
        // @ts-ignore
        ...view.state.selection.node.attrs,
        width: img.style.width,
        height: img.style.height,
      })
      view.dispatch(tr)
    }

    document.documentElement.addEventListener('mousemove', doDrag, false)
    document.documentElement.addEventListener('mouseup', stopDrag, false)
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
          handleDOMEvents: {
            dblclick: (view, event) => {
              if ((event.target as HTMLElement)?.className === 'resize-handle') {
                this.handleImageResize(view, event)
                return true
              }
              return false
            },
          },

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
