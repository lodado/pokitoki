'use client'

import React from 'react'

import useCounter from '../adapter/useCounter'

const Counter = () => {
  const { count, increment, decrement, updateRepository } = useCounter()

  return (
    <>
      <h1>This is the Counter page</h1>
      <p>The count is {count}</p>
      <button type="button" onClick={() => increment(1)}>
        +
      </button>
      <button type="button" onClick={() => decrement(1)}>
        -
      </button>

      <button type="button" onClick={() => updateRepository()}>
        ^
      </button>
    </>
  )
}

export default Counter
