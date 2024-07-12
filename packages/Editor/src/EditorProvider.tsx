import { contextBuildHelper } from '@custompackages/shared'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

export const [EditorProvider, useEditorContext] = contextBuildHelper<{
  view: EditorView
  editorState: EditorState
}>({ id: 'proseEdittor' })
