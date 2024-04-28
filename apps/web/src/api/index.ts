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
  timeout = 5000,
  ...options
}: {
  url: string
  data?: Record<string, unknown> | Array<unknown>
  timeout?: number
} & RequestInit) => {
  const controller = isServerSide() ? new AbortController() : (new MockController() as AbortController)
  const body = ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(data)

  if (!isServerSide()) {
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, timeout)
    timeoutId?.unref?.()
  }

  const response = await fetch(ROOT_URL + url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(isServerSide() ? { signal: controller.signal } : {}),
    ...options,
  })

  const responseData = await response.json()
  return responseData
}

export default request
