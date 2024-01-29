import '../styles/global.scss'
import 'tailwind-config/index.scss'

import { LayoutProps } from '@/interface'
import { i18nOption } from '@/lib/i18n'

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL

export const metadata = {
  metadataBase: new URL(webUrl!),
  alternates: {
    canonical: '/',
    languages: {
      ...i18nOption.locales.reduce((total: any, ele) => {
        total[ele] = `/${ele}`
        return total
      }, {}),
    },
  },
}

export default function RootLayout({ children }: LayoutProps) {
  return children
}
