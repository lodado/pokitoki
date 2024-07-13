import { contextBuildHelper } from '@custompackages/shared'
import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { DOMParser } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { EditorState, Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'
import React, { createContext, useEffect, useRef, useState } from 'react'

import { WidgetController } from './components'
import { createState, createView } from './core'
import { EditorProvider } from './EditorProvider'

const useEditorView = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<EditorView | null>(null)
  const [editorState, setEditorState] = useState<EditorState | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      const state = createState({ editor: editorRef.current! })
      const viewInstance = createView({ editor: editorRef.current!, state })

      setEditorState(state)
      setView(viewInstance)

      return () => viewInstance.destroy()
    }

    return () => {}
  }, [])

  return { editorRef, editorState, view }
}

const Editor = () => {
  const { editorRef, view, editorState } = useEditorView()

  return (
    <>
      <EditorProvider view={view!} editorState={editorState!}>
        <div className="editor-sandbox">
          <div ref={editorRef} />
        </div>
      </EditorProvider>

      <WidgetController.Widgets />
    </>
  )
}

export default Editor
