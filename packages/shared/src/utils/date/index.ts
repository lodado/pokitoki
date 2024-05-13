import 'dayjs/locale/ko' // 한국어
import 'dayjs/locale/zh-cn' // 중국어 간체
import 'dayjs/locale/ja' // 일본어

import dayjs, { ConfigType, Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utcforExtends from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utcforExtends)
dayjs.extend(timezone)

/** 일단 next-inti 기준으로 맞춤 */
const i18nConverter = {
  jp: 'ja',
  cn: 'zh-cn',
}

const i18nLocale = (locale: string) => {
  return i18nConverter[locale] ?? locale
}

const i18nDate = (locale: string, option?: ConfigType) => {
  return dayjs(option).locale(i18nLocale(locale))
}

const getUnixTimestamp = ({
  year,
  month,
  day,
  hour = 13,
  minute = 0,
  second = 0,
}: {
  year: number
  month: number
  day: number
  hour?: number
  minute?: number
  second?: number
}) => {
  const date = dayjs(new Date(year, month - 1, day, hour, minute, second))

  return date.unix()
}

const { tz, utc } = dayjs

export { dayjs, getUnixTimestamp, i18nDate, i18nLocale, tz as timezone, utc }
