import { ICON_MENU } from '@custompackages/design-assets'
import React from 'react'

import { BasicCardTemplate } from './templates/Template'

interface CardPropsBase {
  subTitle: string
  mainTitle: string
}

interface CardImageProps extends CardPropsBase {
  alt: string
  url: string
}

type VariantPropsMapping = {
  small: CardPropsBase
  xsmall: CardPropsBase
  medium: CardImageProps
  large: CardImageProps
}

/** TO DO - 디자인 시안이 필요함 */
const SmallCard: React.FC<CardPropsBase> = ({ subTitle, mainTitle }) => {
  return (
    <BasicCardTemplate>
      <BasicCardTemplate.Description subTitle={subTitle} mainTitle={mainTitle} />
    </BasicCardTemplate>
  )
}

/** TO DO - 디자인 시안이 필요함 */
const XSmallCard: React.FC<CardPropsBase> = ({ subTitle, mainTitle }) => {
  return (
    <BasicCardTemplate>
      <BasicCardTemplate.Description subTitle={subTitle} mainTitle={mainTitle} />
    </BasicCardTemplate>
  )
}

const MediumCard: React.FC<CardImageProps> = ({ subTitle, mainTitle, alt, url }) => {
  return (
    <BasicCardTemplate className="w-[280px] h-[108px] rounded-lg">
      <BasicCardTemplate.CardImage
        className="w-[280px] h-[108px]"
        alt={alt ?? ''}
        src={url ?? ''}
        width={280}
        height={176}
      />

      <div className="flex justify-between w-full h-[48px] pl-4 pr-4 pt-1 shadow-card-02">
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

const LargeCard: React.FC<CardImageProps> = ({ subTitle, mainTitle, alt, url }) => {
  return (
    <BasicCardTemplate className="w-[396px] h-[224px] rounded-lg">
      <BasicCardTemplate.CardImage
        className="w-full h-[108px]"
        alt={alt ?? ''}
        src={url ?? ''}
        width={396}
        height={156}
      />

      <div className="flex justify-between w-full h-[48px] pl-4 pr-4 pt-1 shadow-card-02">
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
}

const Card = <V extends keyof VariantPropsMapping>(props: { variant: V } & VariantPropsMapping[V]) => {
  const { variant, ...restProps } = props
  const CardComponent = variantComponentMapping[variant]

  return <CardComponent {...(restProps as any)} />
}

export default Card
