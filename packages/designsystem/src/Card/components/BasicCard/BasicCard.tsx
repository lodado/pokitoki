import React from 'react'

import { BasicCardTemplate } from './Template'

const BasicCard = ({ id, subTitle, mainTitle, alt, url }: any) => {
  return (
    <BasicCardTemplate key={id}>
      <BasicCardTemplate.CardImage alt={alt} src={url ?? ''} />
      <BasicCardTemplate.Description subTitle={subTitle} mainTitle={mainTitle} />
    </BasicCardTemplate>
  )
}

export default BasicCard
