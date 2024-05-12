import 'dayjs/locale/ko' // 한국어
import 'dayjs/locale/zh-cn' // 중국어 간체
import 'dayjs/locale/ja' // 일본어

import dayjs, { ConfigType, Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)

/** 일단 next-inti 기준으로 맞춤 */
const i18nConverter = {
  jp: 'ja',
  cn: 'zh-cn',
}

const i18nLocale = (locale: string) => {
  return i18nConverter[locale] ?? locale
}

const dayjsExt = dayjs

const i18nDate = (locale: string, option?: ConfigType) => {
  return dayjsExt(option).locale(i18nLocale(locale))
}

export { dayjsExt as dayjs, i18nDate, i18nLocale }
