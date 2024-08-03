import { action, makeAutoObservable, makeObservable, observable } from 'mobx'

import OpenableStore from '../model/OpenableStore'
import { Position } from './type'

class BlockCreateButtonStore extends OpenableStore {
  position: Position = { x: 0, y: 0 }

  constructor() {
    super()
    makeObservable(this, {
      position: observable,
      openTrigger: action,
      closeTrigger: action,
    })
  }

  openTrigger({ x, y }: Position) {
    this.position = { x: 0, y: y - 10 }
    this.open()
  }

  closeTrigger() {
    this.isOpen = false
    this.close()
  }
}

const blockCreateButtonStore = new BlockCreateButtonStore()
export default blockCreateButtonStore
