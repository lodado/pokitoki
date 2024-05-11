import 'dayjs/locale/ko' // 한국어
import 'dayjs/locale/zh-cn' // 중국어 간체
import 'dayjs/locale/ja' // 일본어

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const dayjsExt = dayjs
dayjs.extend(relativeTime)

/** 일단 next-inti 기준으로 맞춤 */
const i18nConverter = {
  jp: 'ja',
  cn: 'zh-cn',
}

const i18nDayJs = (locale: string) => {
  const day = dayjsExt()
  return day.locale(i18nConverter[locale] ?? locale)
}

export { dayjsExt as dayjs, i18nDayJs }
