/* eslint-disable no-param-reassign */
import { action, makeAutoObservable, makeObservable, observable } from 'mobx'

export default class OpenableStore {
  isOpen = false
  constructor() {
    makeObservable(this, {
      isOpen: observable,
      open: action,
      close: action,
    })
  }
  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}
