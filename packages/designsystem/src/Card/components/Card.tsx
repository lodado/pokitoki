'use client'

import { ICON_MENU } from '@custompackages/design-assets'
import { cn } from '@custompackages/shared'
import React, { ReactNode } from 'react'

import { BasicCardTemplate } from './templates/Template'

export interface CardPropsBase extends React.HTMLAttributes<HTMLDivElement> {
  subTitle: ReactNode
  mainTitle: ReactNode
  isSelected?: boolean
}

export interface CardImageProps extends CardPropsBase {
  alt?: string
  url: string

  subTitle: string
  mainTitle: string
}

export interface CheckListProps extends CardPropsBase {
  icon: ReactNode
}

type VariantPropsMapping = {
  small: CardPropsBase
  xsmall: CardPropsBase
  medium: CardImageProps
  large: CardImageProps
  checkList: CheckListProps
}

const CheckList: React.FC<CheckListProps> = ({ className, icon, subTitle, mainTitle, isSelected, ...rest }) => {
  return (
    <BasicCardTemplate
      className={`${className} flex flex-col items-center justify-between p-spacing-4 h-[7.5rem]`}
      isSelected={isSelected}
      {...rest}
    >
      <BasicCardTemplate.MainTitle title={mainTitle} />

      {icon}

      <span>
        <span>
          <BasicCardTemplate.SubTitle title={subTitle} />
        </span>
      </span>
    </BasicCardTemplate>
  )
}

/** TO DO - 디자인 시안이 필요함 */
const SmallCard: React.FC<CardPropsBase> = ({ className, subTitle, mainTitle, ...rest }) => {
  return (
    <BasicCardTemplate className={className} {...rest}>
      <BasicCardTemplate.Description subTitle={subTitle} mainTitle={mainTitle} />
    </BasicCardTemplate>
  )
}

/** TO DO - 디자인 시안이 필요함 */
const XSmallCard: React.FC<CardPropsBase> = ({ className, subTitle, mainTitle, ...rest }) => {
  return (
    <BasicCardTemplate className={className} {...rest}>
      <BasicCardTemplate.Description subTitle={subTitle} mainTitle={mainTitle} />
    </BasicCardTemplate>
  )
}

const MediumCard: React.FC<CardImageProps> = ({ className, subTitle, mainTitle, isSelected, alt, url, ...rest }) => {
  return (
    <BasicCardTemplate isSelected={isSelected} className={cn(`w-[234px]`, className)} {...rest}>
      <BasicCardTemplate.CardImage
        className="w-[234px] h-[108px]"
        alt={alt ?? mainTitle}
        src={url ?? ''}
        width={280}
        height={176}
      />

      <div className="flex justify-between w-full h-[48px] pl-4 pr-4 pt-1">
        <div>
          <BasicCardTemplate.MainTitle title={mainTitle} />
          <BasicCardTemplate.SubTitle title={subTitle} />
        </div>
        <div className="flex flex-col justify-center h-full">
          <ICON_MENU />
        </div>
      </div>
    </BasicCardTemplate>
  )
}

const LargeCard: React.FC<CardImageProps> = ({ className, subTitle, mainTitle, isSelected, alt, url, ...rest }) => {
  return (
    <BasicCardTemplate isSelected={isSelected} className={cn(`w-[396px]`, className)} {...rest}>
      <BasicCardTemplate.CardImage
        className="w-full h-[108px]"
        alt={alt ?? mainTitle}
        src={url ?? ''}
        width={396}
        height={156}
      />

      <div className="flex justify-between w-full h-[48px] pl-4 pr-4 pt-1">
        <div>
          <BasicCardTemplate.MainTitle title={mainTitle} />
          <BasicCardTemplate.SubTitle title={subTitle} />
        </div>
        <div className="flex flex-col justify-center h-full">
          <ICON_MENU />
        </div>
      </div>
    </BasicCardTemplate>
  )
}

const variantComponentMapping: {
  [K in keyof VariantPropsMapping]: React.ComponentType<VariantPropsMapping[K]>
} = {
  small: SmallCard,
  xsmall: XSmallCard,
  medium: MediumCard,
  large: LargeCard,
  checkList: CheckList,
}

const Card = <V extends keyof VariantPropsMapping>(props: { variant: V } & VariantPropsMapping[V]) => {
  const { variant, ...restProps } = props
  const CardComponent = variantComponentMapping[variant]

  return <CardComponent {...(restProps as any)} />
}

export default Card
