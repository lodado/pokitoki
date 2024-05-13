import { cache } from 'react'

const rawParseServerCookie = async () => {
  const cookieString = (await import('next/headers'))
    .cookies()
    .getAll()
    .filter(({ name }) => name.startsWith('authjs'))
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ')

  return cookieString
}

export const parseServerCookie = cache(rawParseServerCookie)
