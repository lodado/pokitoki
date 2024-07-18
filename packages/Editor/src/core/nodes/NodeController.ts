/* eslint-disable no-param-reassign */
import { NodeSpec, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import React from 'react'

import BaseNode from './BaseNode'
import Break from './Break'
import Code from './Code'
import { CodeMirrorNode } from './CodeMirror'
import Heading from './Heading'
import ProseImage from './Image/Image'
import Indent from './Indent'
import Paragraph from './Paragraph'
import SplitScreen from './Split'

const NODE_REGISTER: BaseNode[] = [
  new ProseImage(),
  new Heading(),
  new Break(),
  new Code(),
  new CodeMirrorNode(),
  new Indent(),
  new SplitScreen(),
]

/**
 * schema가 역순으로 배열 읽게 설정해놨는데
 * paragraph를 가장 먼저 안 읽으면 화면 터짐
 */
NODE_REGISTER.push(new Paragraph())

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
