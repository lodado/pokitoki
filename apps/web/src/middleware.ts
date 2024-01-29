import { NextRequest, NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import createIntlMiddleware from 'next-intl/middleware'

import { authConfig } from './app/api/auth/auth.config'
import { i18nOption } from './lib/i18n'

export async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  // const defaultLocale = request.headers.get('x-your-custom-locale') || 'en'

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware(i18nOption as any)
  const response = handleI18nRouting(request)

  // Step 3: Alter the response (example)
  // response.headers.set('x-your-custom-locale', defaultLocale)

  return response
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)'],
}

export default NextAuth(authConfig).auth as any
