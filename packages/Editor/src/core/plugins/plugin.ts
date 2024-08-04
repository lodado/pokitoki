import { baseKeymap } from 'prosemirror-commands'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'

import { WidgetController } from '../../components'
import { MarkController } from '../marks'
import { NodeController } from '../nodes'
import { BlockDnDHighlightPlugin } from './highlightPlugin'
import { saveDocument } from './utils/saveDocument'

export const createPlugin = (schema: Schema) => {
  return [
    ...WidgetController.getPlugins(),
    ...NodeController.getPlugins(schema),
    ...MarkController.getPlugins(schema),
    keymap({
      ...baseKeymap,
      'Mod-z': undo,
      'Mod-Shift-z': redo, // Redo command for Mac
      'Mod-y': redo,
      'Mod-s': saveDocument,
    }),

    history(),
    gapCursor(),
    dropCursor(),

    BlockDnDHighlightPlugin,
  ]
}
