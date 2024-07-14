import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

import { MarkController } from '../marks'
import { NodeController } from '../nodes'

const { nodes: basicNodes, marks: basicMarks } = basicSchema.spec

const customNodes = NodeController.getNodes()
const customMarks = MarkController.getMarks()

let nodes = basicNodes
let marks = basicMarks.remove('em').remove('strong')

Object.keys(customNodes).forEach((key) => {
  nodes = nodes.remove(key)
})

Object.keys(customMarks).forEach((key) => {
  marks = marks.remove(key)

  marks = marks.addToEnd(key, customMarks[key])
})

export const createSchema: () => Schema = () =>
  new Schema({
    nodes: addListNodes(nodes.append(customNodes), 'paragraph block*', 'block'),
    marks,
  })
