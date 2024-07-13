import { Root } from '@radix-ui/react-portal'
import { observer } from 'mobx-react'
import React from 'react'

import dropdownStore from './model'

export const Dropdown = observer(() => {
  const { isOpen, position } = dropdownStore
  if (!isOpen) return null

  return (
    <Root>
      (
      <ul
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          listStyleType: 'none',
          padding: '8px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
        }}
      />
      )
    </Root>
  )
})
