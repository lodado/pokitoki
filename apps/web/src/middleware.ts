import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { supabaseProjectId } from '../misc'
import { i18nOption } from './lib/i18n'
import { auth, authConfig, NextAuth } from './lib/nextAuth'

export const runtime = 'nodejs'

const redirectPath = (request: NextRequest, newPath: string) => {
  const url = request.nextUrl.clone()
  url.pathname = newPath

  return NextResponse.redirect(url)
}

const cspMiddleware = (request: NextRequest, response: NextResponse) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'none';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' www.googletagmanager.com;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: ${supabaseProjectId}.supabase.co;
    font-src 'self' cdnjs.cloudflare.com spoqa.github.io cdn.jsdelivr.net;
    script-src 'self' 'unsafe-eval' 'nonce-${nonce}' 'strict-dynamic';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    manifest-src 'self';
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}

const i18nMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const handleI18nRouting = await createIntlMiddleware(i18nOption as any)
  const response = handleI18nRouting(request)

  return cspMiddleware(request, response)
}

const withAuthApiMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const session = await auth()
  const response = NextResponse.next()

  // private page
  if (!session && /\/protected/.test(path)) {
    return NextResponse.json({ message: 'Login required.' }, { status: 401 })
  }

  return response
}

const withAuthMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const session = await auth()

  if (path.endsWith('/login')) {
    // after login
    if (session) {
      return redirectPath(request, '/protected/dashboard')
    }

    // before login
    return i18nMiddleware(request, path, defaultLocale)
  }

  // private page
  if (!session) {
    return redirectPath(request, '/login')
  }

  return i18nMiddleware(request, path, defaultLocale)
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en'

  if (path.startsWith('/api')) {
    return withAuthApiMiddleware(request, path, defaultLocale)
  }

  if (/\/protected/.test(path) || path.endsWith('/login')) {
    return withAuthMiddleware(request, path, defaultLocale)
  }

  return i18nMiddleware(request, path, defaultLocale)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)'],
}
