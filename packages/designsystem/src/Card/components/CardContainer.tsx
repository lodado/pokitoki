import { contextBuildHelper } from '@custompackages/shared'
import { Children, cloneElement, HTMLAttributes, MouseEvent, MouseEventHandler, ReactNode, useId } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const [CardProvider, useCardContext] = contextBuildHelper<{}>({ id: 'Card' })

const CardContainer = (props: CardProps) => {
  const { children, ...rest } = props

  return (
    <CardProvider>
      <div {...rest}>{children}</div>
    </CardProvider>
  )
}

export default CardContainer
