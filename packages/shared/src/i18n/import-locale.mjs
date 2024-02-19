import { writeFileSync } from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const KEY_MARKER = 'key'
const SPREAD_SHEET_ID = '15NqugKxhd8qRfQBk07QywE0-A4_BDnecAi6JKDA4D_w'

const commaSplitterRegex = /(['"])((?:\\.|(?:(?!\1)[^\\]))*)\1/g
const removeSideCommaRegex = /^"|"$/g

const getKeysAndRows = (text) => {
  const [head, ...body] = text.split('\n')
  const keys = head.match(commaSplitterRegex).map((key) => key.replace(removeSideCommaRegex, ''))
  const rows = body.map((row) => row.match(commaSplitterRegex))

  return { keys, rows, length: keys.length }
}

const mapKeysAndValues = ({ keys, rows, length }) => {
  const locales = keys.filter((key) => !key.includes(KEY_MARKER))
  const fileMap = locales.reduce((obj, key) => ({ ...obj, [key]: {} }), {})

  for (const row of rows) {
    let keyName = ''

    for (let i = 0; i < length; i += 1) {
      const key = keys[i]
      const value = row[i].replace(removeSideCommaRegex, '')

      if (key.includes(KEY_MARKER)) {
        keyName = value
      } else {
        fileMap[key][keyName] = value
      }
    }
  }

  return fileMap
}

const generateLocaleFiles = async () => {
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${SPREAD_SHEET_ID}/gviz/tq?tqx=out:csv`)
  const csvText = await response.text()

  const parsedValues = getKeysAndRows(csvText)
  const parsedJson = mapKeysAndValues(parsedValues)

  const dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const fileDir = path.resolve(dirname, '..', 'i18n', 'locales')

  for (const [locale, json] of Object.entries(parsedJson)) {
    const fileName = `${locale}.json`
    writeFileSync(path.resolve(fileDir, fileName), JSON.stringify(json, null, 2), 'utf8')
    console.info(`✅   type file "${fileName}" created in ${fileDir}`)
  }
}

generateLocaleFiles()
