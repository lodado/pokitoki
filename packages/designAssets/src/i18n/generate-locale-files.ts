/* eslint-disable no-continue */
import { writeFileSync } from 'node:fs'
import path from 'node:path'

// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch'

const KEY_MARKER = 'key'
const DEPTH_SEPARATOR = '-'
const SPREAD_SHEET_ID = '1d2YY2kb-riWGGJ905Gg0r1s1A7e4PTlKrymzGA1MVuE'

const commaSplitterRegex = /(['"])((?:\\.|(?:(?!\1)[^\\]))*)\1/g
const removeSideCommaRegex = /^"|"$/g

const getKeysAndRows = (text: string) => {
  const [head, ...body] = text.split('\n')
  const keys = head.match(commaSplitterRegex)?.map((key) => key?.replace(removeSideCommaRegex, '')) || []
  const rows = body.map((row) => row.match(commaSplitterRegex) as string[])

  return { keys, rows, length: keys.length }
}

const mapKeysAndValues = ({ keys, rows, length }: { keys: string[]; rows: string[][]; length: number }) => {
  const locales = keys.filter((key) => key && !key.includes(KEY_MARKER))
  const fileMap: Record<string, Object> = locales.reduce((obj, key) => ({ ...obj, [key]: {} }), {})

  for (const row of rows) {
    let keyName = ''

    for (let i = 0; i < length; i += 1) {
      const key = keys[i]
      if (!row[i] || !key) {
        continue
      }

      const value = row[i].replace(removeSideCommaRegex, '')

      if (key.includes(KEY_MARKER)) {
        keyName = value
      } else {
        let targetDepth = fileMap
        const indexOfFirstSeparator = keyName.indexOf(DEPTH_SEPARATOR)

        const splittedKeys = [
          key,
          ...[keyName.slice(0, indexOfFirstSeparator), keyName.slice(indexOfFirstSeparator + 1)],
        ]
        const targetKeyName = splittedKeys.pop() || ''

        for (const currentKey of splittedKeys) {
          if (!targetDepth[currentKey]) targetDepth[currentKey] = {}
          targetDepth = targetDepth[currentKey] as typeof fileMap
        }
        targetDepth[targetKeyName] = value
      }
    }
  }

  return fileMap
}

export const generateLocaleFiles = async (saveLocation: string) => {
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${SPREAD_SHEET_ID}/gviz/tq?tqx=out:csv`)
  const csvText = await response.text()

  const parsedValues = getKeysAndRows(csvText)
  const parsedJson = mapKeysAndValues(parsedValues)

  const fileDir = path.resolve(saveLocation)

  for (const [locale, json] of Object.entries(parsedJson)) {
    const fileName = `${locale}.json`
    writeFileSync(path.resolve(fileDir, fileName), JSON.stringify(json, null, 2), 'utf8')
    // eslint-disable-next-line no-console
    console.info(`✅   type file "${fileName}" created in ${fileDir}`)
  }
}
