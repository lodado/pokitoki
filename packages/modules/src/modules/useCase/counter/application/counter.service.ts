import { ServiceInterface } from '@/modules/core/domain/adapter/Service'

import CounterRepositoryInterface from '../domain/counter.repository.interface'

export default class CounterService<
  REPO extends { counterRepository: CounterRepositoryInterface },
> extends ServiceInterface<REPO> {
  public async increment(by: number): Promise<void> {
    const { counterRepository } = this.repositories

    return counterRepository.increment(by)
  }

  public async decrement(by: number): Promise<void> {
    const { counterRepository } = this.repositories

    return counterRepository.decrement(by)
  }
}
