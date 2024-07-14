import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

import { NodeController } from '../nodes'

const { nodes: basicNodes, marks } = basicSchema.spec

const customNodes = NodeController.getNodes()
let nodes = basicNodes

const customMarks = {}

Object.keys(customNodes).forEach((key) => {
  nodes = nodes.remove(key)
})

export const createSchema: () => Schema = () =>
  new Schema({
    nodes: addListNodes(nodes.append(customNodes), 'paragraph block*', 'block'),
    marks: marks.append(customMarks),
  })
