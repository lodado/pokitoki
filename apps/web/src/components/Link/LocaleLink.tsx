import Link from 'next/link'
import React, { ComponentProps } from 'react'

import { useUrl } from '@/hooks'

const LocaleLink = (props: ComponentProps<typeof Link>) => {
  const { href: _href, ...rest } = props
  const { params } = useUrl()
  const { locale } = params as unknown as { locale: string }

  const href = `/${locale}${_href}`

  return <Link {...rest} href={href} />
}

export default LocaleLink
