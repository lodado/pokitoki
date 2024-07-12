import { DOMParser } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'

import { createPlugin } from './plugin/plugin'
import { createSchema } from './schema/schema'

export const createState = ({ editor }: { editor: HTMLElement }) => {
  const schema = createSchema()

  return EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(editor),
    plugins: createPlugin(schema),
  })
}
