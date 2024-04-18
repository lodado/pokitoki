import { StorageStrategy } from './Strategy/type'

export default class StorageManager {
  private strategy: StorageStrategy

  constructor(strategy: StorageStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: StorageStrategy) {
    this.strategy = strategy
  }

  create(value: any) {
    this.strategy.create(value)
  }

  read() {
    return this.strategy.read()
  }

  update(value: any) {
    this.strategy.update(value)
  }

  delete() {
    this.strategy.delete()
  }

  clear() {
    this.strategy.clear()
  }
}
