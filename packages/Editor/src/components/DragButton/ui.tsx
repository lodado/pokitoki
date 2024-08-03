/* eslint-disable no-param-reassign */
import { ScreenReaderOnly } from '@custompackages/designsystem'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Root } from '@radix-ui/react-portal'
import { observer } from 'mobx-react'
import { Fragment, Node as ProseMirrorNode, Schema, Slice } from 'prosemirror-model'
import { dropPoint } from 'prosemirror-transform'
import { EditorView } from 'prosemirror-view'
import React, { MouseEventHandler } from 'react'

import { findTopLevelNode } from '../../core/nodes/utils'
import { useEditorContext } from '../../EditorProvider'
import dragButtonStore from './model'

export const DragButton = observer(() => {
  const { view, editorState } = useEditorContext()
  const { isOpen, position, setDragFlag } = dragButtonStore
  if (!isOpen) return null

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setDragFlag(true)

    let dragStartPos: { x: number; y: number } | null = null
    let animationFrameId: number

    const onMouseMove = (e: MouseEvent) => {
      if (!dragStartPos) {
        dragStartPos = { x: e.clientX, y: e.clientY }
      }

      const dx = e.clientX - dragStartPos.x
      const dy = e.clientY - dragStartPos.y

      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        ;(event.target as HTMLButtonElement).style.transform = `translate(0px, ${dy}px)`
      })
    }

    const onMouseUp = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      const targetPoss = dragButtonStore.pos!

      const { node: targetNode, pos: targetPos } = findTopLevelNode(view.state.doc, targetPoss.pos)

      try {
        const pos = view.posAtCoords({ left: e.clientX + 80, top: e.clientY })
        const node = pos && pos.inside >= 0 && view.state.doc.nodeAt(pos.inside)

        if (pos && node) {
          const target: number | null = pos.pos

          if (true) {
            // 트랜잭션을 실행하여 노드 이동
            const { tr } = view.state
            let offset = 0

            // Delete the original node before inserting the new one
            if (targetPos + targetNode!.nodeSize > 0) {
              tr.delete(targetPos, targetPos + targetNode!.nodeSize)
              offset = targetNode!.nodeSize + 1
            }

            const point = dropPoint(
              view.state.doc,
              view.posAtCoords({ left: e.clientX + 80, top: e.clientY })!.pos,
              new Slice(Fragment.from(targetNode), 0, 0),
            )

            if (point !== null) {
              if (point <= targetPos) {
                offset = 0
              }

              tr.insert(point - offset, Fragment.from(targetNode))
            }

            view.dispatch(tr)
          }
        }
      } catch (error) {
        console.error('Error while moving node', error)
      }

      setDragFlag(false)
      ;(event.target as HTMLButtonElement).style.transform = ''
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <Root>
      <button
        type="button"
        className="bg-transparent text-cancel-default"
        style={{
          position: 'absolute',
          width: '37px',
          height: '37px',
          top: position.y,
          left: position.x,
        }}
        onMouseDown={handleMouseDown}
      >
        <DragIndicatorIcon role="none presentation" aria-hidden={false} />
        <ScreenReaderOnly>Drag button</ScreenReaderOnly>
      </button>
    </Root>
  )
})
