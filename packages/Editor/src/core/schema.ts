import { Schema } from 'prosemirror-model'

export const createSchema = () =>
  new Schema({
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
  })
