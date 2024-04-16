import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { i18nOption } from './lib/i18n'
import { auth } from './lib/nextAuth'

export const runtime = 'nodejs'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = await auth()

  if (path.startsWith('/api') && !session) {
    return NextResponse.json({ message: 'Login required.' }, { status: 401 })
  }

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
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)'],
}
