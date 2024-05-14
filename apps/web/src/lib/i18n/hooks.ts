import { useTranslations as useI18n } from 'next-intl'
import { getTranslations as getI18n } from 'next-intl/server'
import { cache } from 'react'

const cachedGetI18n = cache(getI18n as any)

export { cachedGetI18n as getI18n, useI18n }
