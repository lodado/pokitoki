import { action, makeAutoObservable, makeObservable, observable } from 'mobx'
import { Node as ProseMirrorNode, ResolvedPos } from 'prosemirror-model'

import OpenableStore from '../model/OpenableStore'
import { Position } from './type'

class DragButtonStore extends OpenableStore {
  position: Position = { x: 0, y: 0 }
  pos: ResolvedPos | null = null
  node: ProseMirrorNode | null = null

  dragFlag = false

  constructor() {
    super()
    makeObservable(this, {
      position: observable,
      node: observable,
      openTrigger: action,
      closeTrigger: action,
    })
  }

  setDragFlag = (flag: boolean) => {
    this.dragFlag = flag
  }

  openTrigger({ x, y, node, pos }: Position & { pos: ResolvedPos; node: ProseMirrorNode }) {
    if (this.dragFlag) return
    this.position = { x: 24, y: y - 10 }
    this.node = node
    this.pos = pos

    this.open()
  }

  closeTrigger() {
    if (this.dragFlag) return

    this.isOpen = false
    this.close()
  }
}

const dragButtonStore = new DragButtonStore()
export default dragButtonStore
