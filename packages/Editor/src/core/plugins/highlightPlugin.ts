import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'

// Helper function to get the node under the mouse pointer
function getNodeFromEvent(view: EditorView, event: MouseEvent) {
  const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })
  if (!pos) return null

  const resolvedPos = view.state.doc.resolve(pos.pos)
  const node = resolvedPos.node(resolvedPos.depth)

  if (node) {
    const start = resolvedPos.start(resolvedPos.depth) - 1
    const end = resolvedPos.end(resolvedPos.depth) + 1
    return {
      node,
      start,
      end,
    }
  }
  return null
}

export const hoverHighlightPlugin = new Plugin({
  props: {
    decorations(state) {
      return this.getState(state)
    },
  },
  state: {
    init() {
      return DecorationSet.empty
    },
    apply(tr, old) {
      const nodeInfo = tr.getMeta(hoverHighlightPlugin)
      if (nodeInfo === undefined) return old

      if (nodeInfo === null) {
        return DecorationSet.empty
      }

      const { start, point, end } = nodeInfo

      if (start <= -1) {
        return old
      }

      const deco = Decoration.node(start, end, { class: `hover-border ${point < end ? 'start' : 'end'}` })
      return DecorationSet.create(tr.doc, [deco])
    },
  },
})

/* FIXME 
  나중 css 관리법 정하면 이동시키기
*/
const style = document.createElement('style')
style.innerHTML = `
  .hover-border {
   
  }

  .hover-border.start {
    border-top: 4px solid blue; 
  }

  .hover-border.end {
    border-bottom: 4px solid blue; 
  }
`
document.head.appendChild(style)
