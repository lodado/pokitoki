import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorView,NodeView } from 'prosemirror-view'

export default class ImageNodeView implements NodeView {
  dom: HTMLElement
  contentDOM: HTMLElement
  node: ProsemirrorNode
  view: EditorView
  getPos: () => number
  handle: HTMLElement
  startX: number = 0
  startY: number = 0
  startWidth: number = 0
  startHeight: number = 0

  constructor(node: ProsemirrorNode, view: EditorView, getPos: () => number) {
    this.node = node
    this.view = view
    this.getPos = getPos

    // Create DOM element
    this.dom = document.createElement('div')
    this.dom.style.display = 'inline-block'
    this.dom.style.position = 'relative'
    this.dom.style.width = node.attrs.width
    this.dom.style.height = node.attrs.height

    this.contentDOM = document.createElement('img')
    this.contentDOM.src = node.attrs.src
    this.contentDOM.alt = node.attrs.alt
    this.contentDOM.title = node.attrs.title
    this.contentDOM.style.width = '100%'
    this.contentDOM.style.height = '100%'

    this.dom.appendChild(this.contentDOM)

    // Create resize handle
    this.handle = document.createElement('div')
    this.handle.style.position = 'absolute'
    this.handle.style.bottom = '0'
    this.handle.style.right = '0'
    this.handle.style.width = '10px'
    this.handle.style.height = '10px'
    this.handle.style.background = 'blue'
    this.handle.style.cursor = 'nwse-resize'
    this.dom.appendChild(this.handle)

    // Handle mouse events
    this.handle.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault()
    this.startX = event.clientX
    this.startY = event.clientY
    this.startWidth = parseInt(document.defaultView?.getComputedStyle(this.dom).width || '0', 10)
    this.startHeight = parseInt(document.defaultView?.getComputedStyle(this.dom).height || '0', 10)

    document.documentElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.documentElement.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault()
    const width = this.startWidth + event.clientX - this.startX
    const height = this.startHeight + event.clientY - this.startY
    this.dom.style.width = `${width}px`
    this.dom.style.height = `${height}px`
  }

  onMouseUp(event: MouseEvent) {
    event.preventDefault()
    document.documentElement.removeEventListener('mousemove', this.onMouseMove.bind(this))
    document.documentElement.removeEventListener('mouseup', this.onMouseUp.bind(this))

    const {width} = this.dom.style
    const {height} = this.dom.style

    const transaction = this.view.state.tr.setNodeMarkup(this.getPos(), null, {
      ...this.node.attrs,
      width,
      height,
    })
    this.view.dispatch(transaction)
  }

  selectNode() {
    this.dom.classList.add('ProseMirror-selectednode')
  }

  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode')
  }

  update(node: ProsemirrorNode) {
    if (node.type !== this.node.type) return false
    this.node = node
    this.dom.style.width = node.attrs.width
    this.dom.style.height = node.attrs.height
    this.contentDOM.src = node.attrs.src
    this.contentDOM.alt = node.attrs.alt
    this.contentDOM.title = node.attrs.title
    return true
  }

  destroy() {
    this.dom.remove()
  }
}
