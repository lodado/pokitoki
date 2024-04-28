import { isServerSide } from '@custompackages/shared'

import { ROOT_URL } from './constant'

class MockController {
  abort() {}
}

const request = async <T>({
  method = 'GET',
  url = '',
  headers,
  data,
  params,
  timeout = 5000,
  ...options
}: {
  url: string
  data?: Record<string, unknown> | Array<unknown>
  params?: Record<string, string>
  timeout?: number
} & RequestInit): Promise<T> => {
  const controller = isServerSide() ? new AbortController() : (new MockController() as AbortController)
  const body = ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(data)

  if (!isServerSide()) {
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, timeout)
    timeoutId?.unref?.()
  }

  const urlObject = new URL(ROOT_URL + url)

  if (params) {
    const searchParams = new URLSearchParams(params)
    urlObject.search = searchParams.toString()
  }

  const response = await fetch(urlObject.toString(), {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(isServerSide() ? { signal: controller.signal } : {}),
    ...options,
  })

  if (!response.ok) throw new Error(`Failed to fetch ${response.url} ${response.status} ${response.statusText}`)

  const responseData = await response.json()
  return responseData
}

export default request
