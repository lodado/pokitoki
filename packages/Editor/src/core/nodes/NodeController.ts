/* eslint-disable no-param-reassign */
import { NodeSpec, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import React from 'react'

import BaseNode from './BaseNode'
import Break from './Break'
import Heading from './Heading'

const NODE_REGISTER = [new Heading(), new Break()]

class _NodeController {
  nodes = NODE_REGISTER

  getPlugins(schema: Schema) {
    return this.nodes.flatMap((node) => {
      const type = schema.nodes[node.name]

      node.setMetadata({ type, schema })
      return node.plugins()
    })
  }

  getNodes() {
    return this.nodes.reduce((obj: { [key in string]: NodeSpec }, node) => {
      obj[node.name] = node.createSchema
      return obj
    }, {})
  }
}

const NodeController = new _NodeController()
export default NodeController
