import { logger } from '@custompackages/clientlogger'

export const JsonIntoString = (json: { [key: string]: string }): string => {
  return Object.entries(json)
    .reduce((total, [key, value]) => `${total} ${key}:${value}`, '')
    .trim()
}

export const createLog = ({
  level = 'info',
  log = '',
  event = '',
}: {
  level: 'info' | 'warn' | 'error'
  log: string | Record<string, string>
  event: string
}) => {
  const path = globalThis.location?.pathname

  const logs = typeof log === 'string' ? log : JsonIntoString(log)

  logger.info(JsonIntoString({ path, event, log: logs, level: level as string }))
}
