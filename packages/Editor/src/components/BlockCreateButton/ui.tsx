import { Dropdown, ScreenReaderOnly } from '@custompackages/designsystem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Root } from '@radix-ui/react-portal'
import { observer } from 'mobx-react'
import React from 'react'

import { BlockCreateContent } from './components/BlockCreateContent'
import blockCreateButtonStore from './model'

export const BlockCreateButton = observer(() => {
  const { isOpen, position } = blockCreateButtonStore
  if (!isOpen) return null

  return (
    <Root>
      <Dropdown>
        <Dropdown.Trigger
          type="button"
          className="bg-transparent text-cancel-default"
          style={{
            position: 'absolute',

            width: '37px',
            height: '37px',
            top: position.y,
            left: position.x,
          }}
        >
          <AddRoundedIcon role="none presentation" aria-hidden={false} />
          <ScreenReaderOnly>Create block</ScreenReaderOnly>
        </Dropdown.Trigger>

        <BlockCreateContent>
          <BlockCreateContent.Item>Text</BlockCreateContent.Item>
          <BlockCreateContent.Item>Image</BlockCreateContent.Item>
          <BlockCreateContent.Item>Video</BlockCreateContent.Item>
          <BlockCreateContent.Item>Divider</BlockCreateContent.Item>
        </BlockCreateContent>
      </Dropdown>
    </Root>
  )
})
