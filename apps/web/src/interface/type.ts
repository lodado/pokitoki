import type { ReactNode } from 'react'

export type LayoutProps = {
  children?: ReactNode

  params: any
}

export type LocaleProps = { params: { locale: string } }
