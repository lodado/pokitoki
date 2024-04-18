import { isServerSide } from '../isServerSide'
import { StorageStrategy } from './Strategy/type'

export default class StorageController<T> {
  private strategy: StorageStrategy

  constructor(strategy: StorageStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: StorageStrategy) {
    this.strategy = strategy
  }

  create(value: T) {
    if (!isServerSide()) this.strategy.create(value)
  }

  read() {
    if (isServerSide()) return undefined
    return this.strategy.read() as T
  }

  update(value: T) {
    if (!isServerSide()) this.strategy.update(value)
  }

  delete() {
    if (!isServerSide()) this.strategy.delete()
  }

  clear() {
    if (!isServerSide()) this.strategy.clear()
  }
}
