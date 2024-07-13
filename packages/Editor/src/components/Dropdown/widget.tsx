import { Plugin, PluginKey } from 'prosemirror-state'
import React, { PropsWithChildren, useState } from 'react'

import Widget from '../Widget'
import dropdownStore from './model'
import { DropdownPosition } from './type'
import { Dropdown } from './ui'

const count = 0

export default class DropdownWidget extends Widget {
  key = count

  render() {
    return <Dropdown />
  }

  plugin() {
    return [
      new Plugin({
        key: new PluginKey('menu'),
        props: {
          handleDoubleClick: (view, pos) => {
            const { doc, tr } = view.state
            const $pos = doc.resolve(pos)
            const node = $pos.nodeAfter

            if (node) {
              const coords = view.coordsAtPos(pos)
              dropdownStore.openDropdown({ x: coords.left, y: coords.bottom })
              return true
            }
            return false
          },
        },
      }),
    ]
  }
}
