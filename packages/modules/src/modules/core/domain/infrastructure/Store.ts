export interface Store<T = any> {
  useStates: T

  setState: (newState: any) => void

  getState: () => T

  subscribe(reRender: Function): () => void
}
