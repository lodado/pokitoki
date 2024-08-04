import { Plugin, PluginKey } from 'prosemirror-state'
import React, { PropsWithChildren, useState } from 'react'

import { getActualCoord } from '../../utils'
import Widget from '../Widget'
import blockCreateButtonStore from './model'
import { BlockCreateButton } from './ui'

export default class BlockCreateButtonWidget extends Widget {
  render() {
    return <BlockCreateButton />
  }

  plugin() {
    return [
      new Plugin({
        key: new PluginKey('blockCreateButton'),
        props: {
          handleDOMEvents: {
            mouseover: (view, event) => {
              const { target } = event

              // @ts-ignore
              const pos = view.posAtDOM(target, 0)
              const { doc, schema } = view.state
              const $pos = doc.resolve(pos)
              const node = $pos.parent

              const actualCoords = getActualCoord({ view, pos })

              if (node) {
                // Adjust this condition as needed
                blockCreateButtonStore.openTrigger({ x: actualCoords.left, y: actualCoords.bottom - 20 })
              } else {
                blockCreateButtonStore.closeTrigger()
              }

              return false
            },
          },
        },
      }),
    ]
  }
}
