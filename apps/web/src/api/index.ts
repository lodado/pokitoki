type RequestApiResponse<T> = {
  success: boolean
  data: T | null
  error: unknown
}

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
}): Promise<RequestApiResponse<T>> => {
  const controller = new AbortController()
  const body = ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(data)

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)
  timeoutId?.unref?.()

  try {
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

    return await response.json()
  } catch (error: unknown) {
    console.error(`api ${method} failed: ${url}`, error)

    return {
      success: false,
      data: null,
      error,
    }
  }
}

export default request
