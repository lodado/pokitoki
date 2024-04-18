import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { i18nOption } from './lib/i18n'
import { auth, authConfig, NextAuth } from './lib/nextAuth'

export const runtime = 'nodejs'

const i18nMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const handleI18nRouting = createIntlMiddleware(i18nOption as any)
  const response = handleI18nRouting(request)

  response.headers.set('x-your-custom-locale', defaultLocale)

  return response
}

const withAuthMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const session = await auth()
  const response = NextResponse.next()

  // private page
  if (!session && (path.startsWith('/protected') || path.startsWith('/api/protected'))) {
    if (!session) return NextResponse.json({ message: 'Login required.' }, { status: 401 })
  }

  if (path.endsWith('/login')) {
    // after login
    if (session) {
      const url = request.nextUrl.clone()
      url.pathname = '/protected/dashboard'
      return NextResponse.redirect(url)
    }

    // before login
    return i18nMiddleware(request, path, defaultLocale)
  }

  return response
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en'

  if (path.startsWith('/api') || path.endsWith('/login')) {
    return withAuthMiddleware(request, path, defaultLocale)
  }

  return i18nMiddleware(request, path, defaultLocale)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)'],
}
