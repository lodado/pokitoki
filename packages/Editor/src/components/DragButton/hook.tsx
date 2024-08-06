import { Fragment } from 'prosemirror-model'
import { ReactNode, useState } from 'react'

const fragmentToReactNode = (fragment: Fragment): ReactNode => {
  const children: ReactNode[] = []

  fragment.forEach((node, offset, index) => {
    if (node.type.name === 'image') {
      children.push(
        <img
          key={node.type.name + index}
          src={node.attrs.src}
          alt="Content"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />,
      )
    } else if (node.type.name === 'br') {
      children.push(<br key={node.type.name + index} />)
    } else if (node.isText) {
      children.push(<span key={node.type.name + index}>{node.text}</span>)
    } else if (node.isBlock) {
      children.push(<div key={node.type.name + index}>{fragmentToReactNode(node.content)}</div>)
    } else {
      children.push(<span key={node.type.name + index}>Unsupported content</span>)
    }
  })

  return <>{children}</>
}

export const useNodeDnDPlaceHolder = () => {
  const [placeholderPos, setPlaceholderPos] = useState({ x: 0, y: 0 })
  const [showPlaceholder, setShowPlaceholder] = useState(false)
  const [nodeContent, setNodeContent] = useState<ReactNode>(null)

  const handleNodeContent = (content: Fragment | null) => {
    if (content === null) {
      setNodeContent(null)

      return
    }

    setNodeContent(fragmentToReactNode(content))
  }

  const handlePlaceholderPos = ({ x, y }: { x: number; y: number }) => {
    setPlaceholderPos({ x, y })
  }

  const handleShowPlaceholder = (flag: boolean) => {
    setShowPlaceholder(flag)
  }

  return {
    placeholderPos,
    showPlaceholder,
    nodeContent,
    handleNodeContent,
    handlePlaceholderPos,
    handleShowPlaceholder,
  }
}
