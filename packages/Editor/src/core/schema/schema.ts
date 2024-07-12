import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

const { nodes, marks } = basicSchema.spec

const customNodes = {
  nodes: {
    text: {
      group: 'inline',
    },

    star: {
      inline: true,
      group: 'inline',
      toDOM() {
        return ['star', '🟊']
      },
      parseDOM: [{ tag: 'star' }],
    },

    selected: {
      inline: true,
      group: 'inline',
      toDOM() {
        return ['span', '+']
      },
      parseDOM: [{ tag: 'span' }],
    },
    paragraph: {
      group: 'block',
      content: '(inline|text)*',
      toDOM() {
        return ['p', { class: 1 }, 0]
      },
      parseDOM: [{ tag: 'p' }],
    },
    boring_paragraph: {
      group: 'block',
      content: 'text*',
      marks: '',
      toDOM() {
        return ['p', { class: 'boring' }, 0]
      },
      parseDOM: [{ tag: 'p.boring', priority: 60 }],
    },
    doc: {
      content: 'block+',
    },
  },
}

const customMarks = {}

export const createSchema: () => Schema = () =>
  new Schema({
    nodes: addListNodes(nodes.append(customNodes), 'paragraph block*', 'block'),
    marks: marks.append(customMarks),
  })
