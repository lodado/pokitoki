const i18nOption = {
  locales: ['en', 'ko', 'jp', 'cn'],
  defaultLocale: 'en',
  localePrefix: 'always',
}

export const GenerateStaticParamsI18n = () => {
  return i18nOption.locales.map((locale) => ({ locale }))
}

export default i18nOption
