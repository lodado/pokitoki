import { cn } from '@custompackages/shared'
import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

import { Item as RadixItem } from './radix'

export interface ItemProps extends PropsWithChildren, ComponentProps<typeof RadixItem> {}

const Item = (props: ItemProps) => {
  const { className, ...rest } = props

  return (
    <RadixItem
      className={cn('h-8 bg-tertiary-default body-01-r rounded justify-start items-center inline-flex', className)}
      {...rest}
    />
  )
}

export default Item
