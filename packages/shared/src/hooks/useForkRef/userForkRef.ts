/* eslint-disable no-param-reassign */
import { type MutableRefObject, type Ref, type RefCallback, useMemo } from 'react'

const setRef = <T>(
  ref: MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null,
) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

const useForkRef = <Instance>(...refs: Array<Ref<Instance> | undefined>): RefCallback<Instance> | null => {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance)
      })
    }
  }, refs)
}

export default useForkRef
