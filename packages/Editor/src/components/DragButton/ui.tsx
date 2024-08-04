/* eslint-disable no-param-reassign */
import { ScreenReaderOnly } from '@custompackages/designsystem'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Root } from '@radix-ui/react-portal'
import { observer } from 'mobx-react'
import { Fragment, Node as ProseMirrorNode, Schema, Slice } from 'prosemirror-model'
import { dropPoint } from 'prosemirror-transform'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'
import React, { MouseEventHandler, useState } from 'react'

import { findTopLevelNode } from '../../core/nodes/utils'
import { hoverHighlightPlugin, hoverPluginDispatcher } from '../../core/plugins/highlightPlugin'
import { useEditorContext } from '../../EditorProvider'
import { useNodeDnDPlaceHolder } from './hook'
import dragButtonStore from './model'

export const DragButton = observer(() => {
  const { view, editorState } = useEditorContext()
  const {
    placeholderPos,
    showPlaceholder,
    nodeContent,
    handleNodeContent,
    handlePlaceholderPos,
    handleShowPlaceholder,
  } = useNodeDnDPlaceHolder()

  const { isOpen, position, dragFlag, setDragFlag } = dragButtonStore
  const { disPatchHoverPlaceHolder, disPatchCleanHoverPlaceHolder } = hoverPluginDispatcher(view)

  if (!isOpen) return null

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setDragFlag(true)
    handleShowPlaceholder(true)

    let dragStartPos: { x: number; y: number } | null = null
    let animationFrameId: number

    const initPos = view.posAtCoords({ left: event.clientX + 50, top: event.clientY })

    if (initPos) {
      const resolvedPos = view.state.doc.resolve(initPos.pos)
      const node = resolvedPos.node(resolvedPos.depth)
      handleNodeContent(node.content)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragStartPos) {
        dragStartPos = { x: e.clientX, y: e.clientY }
      }

      const pos = view.posAtCoords({ left: e.clientX + 80, top: e.clientY })
      if (!pos) return

      const dx = e.clientX - dragStartPos.x
      const dy = e.clientY - dragStartPos.y

      const point = dropPoint(
        view.state.doc,
        pos.pos,
        new Slice(Fragment.from(view.state.schema.nodes.paragraph.createAndFill()), 0, 0),
      )

      if (point !== null) {
        const resolvedPos = view.state.doc.resolve(pos.pos)
        const node = resolvedPos.node(resolvedPos.depth)

        const start = resolvedPos.start(resolvedPos.depth) - 1
        const end = resolvedPos.end(resolvedPos.depth) + 1

        disPatchHoverPlaceHolder({ node, start, end, point })
      }

      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        ;(event.target as HTMLButtonElement).style.transform = `translate(0px, ${dy}px)`
        ;(event.target as HTMLButtonElement).style.opacity = `0`
        ;(event.target as HTMLButtonElement).style.cursor = `grabbing`
        document.body.style.cursor = 'grabbing'

        handlePlaceholderPos({ x: e.clientX + 50, y: e.clientY })
      })
    }

    const onMouseUp = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      try {
        const targetPoss = dragButtonStore.pos!

        // eslint-disable-next-line prefer-const
        let { node: targetNode, pos: targetPos } = findTopLevelNode(view.state.doc, targetPoss.pos)

        const pos = view.posAtCoords({ left: e.clientX + 80, top: e.clientY })
        const node = pos && pos.inside >= 0 && view.state.doc.nodeAt(pos.inside)
        let offset = 0

        if (!targetNode) {
          targetNode = view.state.schema.nodes.paragraph.createAndFill()!
          offset += 1
        }

        if (pos && node) {
          const target: number | null = pos.pos

          // 트랜잭션을 실행하여 노드 이동
          const { tr } = view.state

          // Delete the original node before inserting the new one
          if (targetNode.nodeSize > 0) {
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

            tr.insert(Math.max(point - offset, 0), Fragment.from(targetNode))
          }

          view.dispatch(tr)
        }
      } catch (error) {
        console.error(error)
      }

      disPatchCleanHoverPlaceHolder()

      handleNodeContent(null)
      handleShowPlaceholder(false)
      setDragFlag(false)

      if (true) {
        ;(event.target as HTMLButtonElement).style.transform = ''
        ;(event.target as HTMLButtonElement).style.opacity = `1`
        ;(event.target as HTMLButtonElement).style.cursor = `pointer`

        document.body.style.cursor = 'default'
      }
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
          cursor: 'pointer',
        }}
        onMouseDown={handleMouseDown}
      >
        <DragIndicatorIcon role="none presentation" aria-hidden={false} />
        <ScreenReaderOnly>Drag button</ScreenReaderOnly>
      </button>

      {showPlaceholder && (
        <div
          className="drag-placeholder"
          style={{
            position: 'absolute',
            top: placeholderPos.y,
            left: placeholderPos.x,
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        >
          {nodeContent}
        </div>
      )}
    </Root>
  )
})
