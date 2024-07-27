import React, { ComponentProps, PropsWithChildren } from 'react'

import { Content, Item, Root, Trigger } from './components'
import { DropdownRootProps } from './components/Root'

export interface DropdownProps extends PropsWithChildren, DropdownRootProps {}

const Dropdown = ({ children, isVisible, setVisible }: DropdownProps) => {
  return (
    <Root isVisible={isVisible} setVisible={setVisible}>
      {children}
    </Root>
  )
}

Dropdown.Trigger = Trigger
Dropdown.Content = Content
Dropdown.Item = Item

export default Dropdown
