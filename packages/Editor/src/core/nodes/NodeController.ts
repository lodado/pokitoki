/* eslint-disable no-param-reassign */
import { NodeSpec, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import React from 'react'

import BaseNode from './BaseNode'
import Break from './Break'
import Code from './Code'
import { CodeMirror } from './CodeMirror'
import Heading from './Heading'
import ProseImage from './Image/Image'
import Indent from './Indent'
import ListItem from './ListItem'
import Paragraph from './Paragraph'
import SplitScreen from './Split'

/**
 * paragraph를 가장 먼저 안 읽으면 화면 터짐
 */
const atomics = {
  paragraph: new Paragraph(),
  proseImage: new ProseImage(),
  heading: new Heading(),
  break: new Break(),
  indent: new Indent(),
}

const molecules = {
  splitScreen: new SplitScreen({ paragraph: atomics.paragraph }),
  code: new Code({ paragraph: atomics.paragraph }),
  codeMirror: new CodeMirror({ paragraph: atomics.paragraph }),

  ListItem: new ListItem({ paragraph: atomics.paragraph }),
}

const NODE_REGISTER: BaseNode[] = [...Object.values(atomics), ...Object.values(molecules)].reverse()

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
