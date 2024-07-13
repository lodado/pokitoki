import { Root } from '@radix-ui/react-portal'
import { observer } from 'mobx-react'
import React from 'react'

import blockCreateButtonStore from './model'

export const BlockCreateButton = observer(() => {
  const { isOpen, position } = blockCreateButtonStore
  if (!isOpen) return null

  return (
    <Root>
      (
      <button
        type="button"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          listStyleType: 'none',
          padding: '8px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
        }}
        onClick={() => {
          console.log('click')
        }}
      >
        +
      </button>
      )
    </Root>
  )
})
