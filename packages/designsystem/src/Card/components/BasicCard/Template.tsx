import React from 'react'

import { ImageProps } from '../../../Image'
import { BasicCardProps, CompoundCard, DescriptionProps } from '../../type'
import Card from '../Card'
import { CardImage, MainTitle, SubTitle } from '../compound'

export const BasicCardTemplate: CompoundCard<BasicCardProps> = ({ children, isSelected, onClick }: BasicCardProps) => {
  const BG_COLOR = isSelected ? 'bg-WHITE border-PRIMARY_BLUE shadow-SM' : 'bg-SUB_BLUE_3'

  return (
    <Card
      onClick={onClick}
      className={`${BG_COLOR} w-[350px] h-[350px] py-[10px] flex flex-col relative justify-center items-center bg-PRIMARY_SUB2_BLUE3 rounded-lg border-[1.5px] border-solid overflow-hidden`}
    >
      {children}
    </Card>
  )
}

BasicCardTemplate.CardImage = ({ src, alt }: ImageProps) => {
  return (
    <div>
      <CardImage src={src} alt={alt} width={150} height={150} />
    </div>
  )
}
const Description = ({ mainTitle, subTitle, isSelected }: DescriptionProps) => {
  return (
    <>
      <SubTitle title={subTitle} />
      <MainTitle title={mainTitle} className="text-center" isSelected={isSelected} />
    </>
  )
}

BasicCardTemplate.Description = Description
