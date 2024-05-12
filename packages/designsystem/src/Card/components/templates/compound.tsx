'use client'

import { ReactNode } from 'react'

import { Image } from '../../../Image'

export interface TitleProps {
  title: ReactNode
  className?: string
}

export const CardImage = Image

export interface MainTitleProps extends TitleProps {}

export const MainTitle = ({ title, className }: MainTitleProps) => {
  return <p className={`heading-01 text-text-01 ${className}`}>{title}</p>
}

export const SubTitle = ({ title, className }: TitleProps) => {
  return <p className={`body-01-r text-text-03 ${className}`}>{title}</p>
}
