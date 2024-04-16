const request = async <T>({
  method = 'GET',
  url = '',
  headers,
  data,
  timeout = 5000,
  ...options
}: {
  method?: RequestInit['method']
  url: string
  headers?: RequestInit['headers']
  data?: Record<string, unknown> | Array<unknown>
  timeout?: number
}): Promise<T> => {
  const controller = new AbortController()
  const body = ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(data)

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)
  timeoutId?.unref?.()

  const response = await fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: controller.signal,
    ...options,
  })

  const responseData: T = await response.json()
  return responseData
}

export default request
