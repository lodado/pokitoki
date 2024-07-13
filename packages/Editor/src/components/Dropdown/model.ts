import { makeAutoObservable } from 'mobx'

import { DropdownPosition } from './type'

class DropdownStore {
  isOpen = false
  position: DropdownPosition = { x: 0, y: 0 }

  constructor() {
    makeAutoObservable(this)
  }

  openDropdown({ x, y }: DropdownPosition) {
    this.position = { x, y }
    this.isOpen = true
  }

  closeDropdown() {
    this.isOpen = false
  }
}

const dropdownStore = new DropdownStore()
export default dropdownStore
