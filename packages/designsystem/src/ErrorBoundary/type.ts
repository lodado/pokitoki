export type HttpError = {
  message: string
  statusCode: number
}

export type CustomError = HttpError | Error | unknown
