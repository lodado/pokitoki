/* eslint-disable react-hooks/rules-of-hooks */
import { Atom, getDefaultStore, useAtomValue, WritableAtom } from 'jotai'

import { Store } from './Store'

/**
 *  뭐가 들어올지 몰라서 any casting 했는데
 *  사용시에는 반드시 as를 통해서 type 지정을 해주세요
 */
export default abstract class JotaiStore<ATOM> implements Store {
  protected atom: Atom<ATOM>
  protected store = getDefaultStore

  constructor(atom: ATOM) {
    this.atom = atom as Atom<ATOM>
  }
  useStates(): any {
    return this.getState()
  }

  subscribe(reRender: Function) {
    const unsub = this.store().sub(this.atom, () => {
      reRender()
    })

    return unsub
  }

  setState(newState: any) {
    this.store().set(this.atom as WritableAtom<any, any, any>, newState) as any
  }

  public getState() {
    return this.store().get(this.atom) as any
  }
}
