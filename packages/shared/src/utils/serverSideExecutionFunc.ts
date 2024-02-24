const ServerSideNoOperator = (() => {}) as any

export const isServerSide = () => typeof window === 'undefined'

export function serverSideExecutionFunc(this: unknown, Func: Function) {
  return (...args: any) => {
    return isServerSide() ? Func.apply(this, args) : ServerSideNoOperator
  }
}
