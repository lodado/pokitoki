import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

import { MarkController } from '../marks'
import { NodeController } from '../nodes'

const { nodes: basicNodes, marks: basicMarks } = basicSchema.spec

const customNodes = NodeController.getNodes()
const customMarks = MarkController.getMarks()

let nodes = basicNodes.remove('hard_break')
let marks = basicMarks.remove('em').remove('strong')

Object.keys(customNodes).forEach((key) => {
  nodes = nodes.remove(key)
  nodes = nodes.addToStart(key, customNodes[key])
})

Object.keys(customMarks).forEach((key) => {
  marks = marks.remove(key)
  marks = marks.addToEnd(key, customMarks[key])
})

const schema = new Schema({
  nodes,
  marks,
})

export const createSchema: () => Schema = () => schema
