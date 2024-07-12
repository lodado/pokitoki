import { baseKeymap } from 'prosemirror-commands'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'

import { buildInputRules } from './inputRules'

export const createPlugin = (schema: Schema) => {
  return [
    buildInputRules(schema),
    keymap({
      ...baseKeymap,
      'Mod-y': redo,
    }),

    history(),
    gapCursor(),
    dropCursor(),
  ]
}
