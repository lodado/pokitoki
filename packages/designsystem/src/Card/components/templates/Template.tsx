/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/prefer-default-export */

'use client'

import React, { FC } from 'react'

import { ImageProps } from '../../../Image'
import { BasicCardProps, DescriptionProps } from '../../type'
import Card from '../CardContainer'
import { CardImage, MainTitle, SubTitle } from './compound'

export const BasicCardTemplate = ({ children, className, isSelected, onClick, ...rest }: BasicCardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>)
    }
  }
  return (
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={`rounded shadow-card-02 bg-tertiary-default outline-0 focus-within:ring-2  focus-within:ring-border-primary-02 focus-within:bg-primary-02-default   ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  )
}

BasicCardTemplate.CardImage = ({ src, alt, width, className, height }: ImageProps) => {
  return (
    <div>
      <CardImage
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
    </div>
  )
}

BasicCardTemplate.MainTitle = MainTitle

BasicCardTemplate.SubTitle = SubTitle

export const Description = ({ mainTitle, subTitle, isSelected }: DescriptionProps) => {
  return (
    <>
      <MainTitle title={mainTitle} />
      <SubTitle title={subTitle} />
    </>
  )
}

BasicCardTemplate.Description = Description
