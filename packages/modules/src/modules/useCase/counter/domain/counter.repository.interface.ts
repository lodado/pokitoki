import { Repository } from '@/modules/core'

export default interface CounterRepositoryInterface extends Repository {
  useStates: any
  getCount: () => number
  increment: (by: number) => Promise<void>
  decrement: (by: number) => Promise<void>
}
