import { Store } from '../infrastructure'

export abstract class Repository<STORE extends Store = Store> {
  protected store: STORE

  constructor(store: STORE) {
    this.store = store
  }
  useStates(): Store['useStates'] {
    return this.store.useStates()
  }

  subscribe(reRender: Function) {
    return this.store.subscribe(reRender)
  }
}
