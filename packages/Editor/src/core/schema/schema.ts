import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

import { NodeController } from '../nodes'

const { nodes, marks } = basicSchema.spec

const customNodes = {
  nodes: NodeController.getNodes(),
}

const customMarks = {}

console.log(customNodes)

export const createSchema: () => Schema = () =>
  new Schema({
    nodes: addListNodes(nodes.append(customNodes), 'paragraph block*', 'block'),
    marks: marks.append(customMarks),
  })
