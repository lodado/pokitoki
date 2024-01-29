/* eslint-disable react-hooks/rules-of-hooks */
import { atom, getDefaultStore, useAtomValue } from 'jotai'

import { Store } from '@/modules/core'
import JotaiStore from '@/modules/core/domain/infrastructure/JotaiStore'

const CounterAtom = atom(0)

class CounterStore extends JotaiStore<typeof CounterAtom> {
  constructor() {
    super(CounterAtom)
  }

  public getCount() {
    return this.getState() as number
  }

  public setCount(newCount: number) {
    this.setState(newCount)
  }
}

export default new CounterStore()
