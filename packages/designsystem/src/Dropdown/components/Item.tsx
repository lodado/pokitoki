import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/utils'

import { Item as RadixItem } from './radix'

export interface ItemProps extends PropsWithChildren, ComponentProps<typeof RadixItem> {}

const Item = (props: ItemProps) => {
  const { className, ...rest } = props

  /** TODO - 디자인 시안 넣을것 */
  return <RadixItem className={cn('', className)} {...rest} />
}

export default Item
