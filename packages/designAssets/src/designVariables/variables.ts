import RAW_COLOR from './variables/color'
import SEMANTIC from './variables/semantic'
import SPACE from './variables/space'

type ColorValue = string
type NestedColorObject = { [key: string]: ColorValue | NestedColorObject }

function transformColorsForTailwind(
  data: NestedColorObject,
  result: NestedColorObject = {},
  parentKey: string = '',
): NestedColorObject {
  Object.entries(data).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}-${key}` : key

    if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
      transformColorsForTailwind(value as NestedColorObject, result, newKey)
    } else {
      let currentDict: NestedColorObject = result
      const keyParts = newKey.split('-')

      keyParts.forEach((part, index) => {
        if (index === keyParts.length - 1) {
          currentDict[part] = value as ColorValue
        } else {
          if (!(part in currentDict)) {
            currentDict[part] = {}
          }
          currentDict = currentDict[part] as NestedColorObject
        }
      })
    }
  })

  return result
}

const COLOR = transformColorsForTailwind({
  light: {
    ...RAW_COLOR.Light.colors,
    ...SEMANTIC.Light.colors,
  },
  dark: {
    ...RAW_COLOR.Dark.colors,
    ...SEMANTIC.Dark.colors,
  },
})

const VARIABLES = { COLOR, SPACE }
export default VARIABLES
