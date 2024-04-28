import 'react-dom'

declare module 'react-dom' {
  function useFormState<State>(
    action: (state: State) => Promise<any>,
    initialState: any,
    permalink?: string,
  ): [state: State, dispatch: () => void]

  function useFormState<State, Payload>(
    action: (state: State, payload: Payload) => Promise<any>,
    initialState: any,
    permalink?: string,
  ): [state: State, dispatch: (payload: Payload) => void]

  function useFormStatus(): {
    pending: boolean
    data: any
    method: 'GET' | 'POST'
    action: any
  }
}
