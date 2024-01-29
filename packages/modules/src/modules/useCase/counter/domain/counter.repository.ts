import { Repository } from '@/modules/core'

import counterStore from '../infrastructure/counter.store'
import CounterRepositoryInterface from './counter.repository.interface'

class CounterRepository extends Repository<typeof counterStore> implements CounterRepositoryInterface {
  constructor() {
    super(counterStore)
  }

  useStates() {
    return this.store.useStates()
  }

  public getCount() {
    return this.store.getCount()
  }

  public async increment(by: number): Promise<void> {
    this.store.setCount(this.getCount() + by)
  }

  public async decrement(by: number): Promise<void> {
    this.store.setCount(this.getCount() - by)
  }
}

export default CounterRepository
