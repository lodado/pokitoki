import { Dropdown, ScreenReaderOnly } from '@custompackages/designsystem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Root } from '@radix-ui/react-portal'
import { observer } from 'mobx-react'
import React from 'react'

import blockCreateButtonStore from './model'

export const BlockCreateButton = observer(() => {
  const { isOpen, position } = blockCreateButtonStore
  if (!isOpen) return null

  return (
    <Root>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <button
            type="button"
            className="bg-transparent text-cancel-default"
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
            }}
          >
            <AddRoundedIcon role="none presentation" aria-hidden={false} />
            <ScreenReaderOnly>Create block</ScreenReaderOnly>
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content style={{ position: 'absolute', top: position.y, left: position.x }}>
          <Dropdown.Item>Text</Dropdown.Item>
          <Dropdown.Item>Image</Dropdown.Item>
          <Dropdown.Item>Video</Dropdown.Item>
          <Dropdown.Item>Divider</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </Root>
  )
})
