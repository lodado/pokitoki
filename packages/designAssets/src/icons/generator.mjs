/*
 reference:
  https://medium.com/iadvize-engineering/using-figma-api-to-extract-illustrations-and-icons-34e0c7c230fa
*/

import dotenv from 'dotenv'
import { appendFileSync, writeFileSync } from 'fs'
import fetch from 'node-fetch'

dotenv.config()

const TOKEN = process.env.FIGMA_WEBHOOK
const FILE_KEY = 'qPHpmvIzntqmqHb5tWtF3b'

const fetchFigmaFile = (key) => {
  return fetch(`https://api.figma.com/v1/files/${key}`, { headers: { 'X-Figma-Token': TOKEN } }).then((response) =>
    response.json(),
  )
}

const flatten = (acc, cur) => [...acc, ...cur]

const getComponentsFromNode = (node) => {
  if (node.type === 'COMPONENT') {
    return [node]
  }
  if ('children' in node) {
    return node.children.map(getComponentsFromNode).reduce(flatten, [])
  }
  return []
}

const formatIconsSVG = (svg) => svg.replace(/xlink:href/g, 'xlinkHref').replace(/xmlns:xlink/g, 'xmlnsXlink')

const formatName = (name) => name?.toUpperCase().replace(/-/g, '_').replace(/ /g, '_') // replaces '/' by '_'

const hash = (path) => path.replace(/^.*\/img\//g, '').replace(/\//g, '_')

let fileIndex = 0

const camelCaseSVGAttributes = (svgString) => {
  // 모든 태그의 속성을 카멜 케이스로 변환
  return svgString.replace(/<(\w+)([^>]+)>/g, function (match, tagName, attributes) {
    const camelCasedAttributes = attributes.replace(/([-][a-z])/gi, function ($1) {
      return $1.toUpperCase().replace('-', '')
    })
    return `<${tagName}${camelCasedAttributes}>`
  })
}

const generateFiles = (ele) => {
  if (!ele) return ''
  const { name, fileName, svg } = ele

  fileIndex += 1

  const camelCasedSVG = camelCaseSVGAttributes(svg)

  const component = `'use client'
  
  import react, { Children, cloneElement, isValidElement, memo, ReactNode, SVGProps } from 'react'

  import processNode from './processNode'

  interface SVGPropsExtended extends SVGProps<SVGSVGElement> {
    fillOverwrite?: string;
  }

  const ${name} = memo((props: SVGPropsExtended) => {
    const { fillOverwrite, ...rest } = props

    return <>
      {Children.map(${camelCasedSVG
        .replace(/<svg([^>]+)>/, '<svg$1 {...rest}>')

        .replace(/url\(#pattern(\d+)\)/g, function (match, p1) {
          return `url(#pattern${fileIndex})`
        })
        .replace(/pattern id="pattern\d+"/g, function (match, p1) {
          return `pattern id="pattern${fileIndex}"`
        })}, child => processNode(child, fillOverwrite))}
    </>
}); 


  export default ${name};
  `

  writeFileSync(`./src/icons/${name}.tsx`, component)
  return `${name}`
}

const getSVGsFromComponents = (components) => {
  const key = FILE_KEY
  const filteredComponent = components.filter(
    ({ name }) => name?.toUpperCase().startsWith('ICON_') && !name?.toUpperCase().startsWith('ICON='),
  )
  const ids = filteredComponent.map(({ id }) => id)

  return fetch(`https://api.figma.com/v1/images/${key}?ids=${ids.join()}&format=svg`, {
    headers: { 'X-Figma-Token': TOKEN },
  })
    .then((response) => response.json())
    .then(({ images }) =>
      Promise.all(
        filteredComponent.map(
          ({ id, name, type }) =>
            images[id] &&
            fetch(images[id])
              .then((response) => response.text())
              .then((svg) => ({
                name: formatName(name),
                fileName: hash(images[id]),
                svg: formatIconsSVG(svg),
              })),
        ),
      ),
    )
}

async function run() {
  if (!TOKEN) {
    console.error(
      'The Figma API token is not defined, you need to set an environment variable `FIGMA_WEBHOOK` to run the script',
    )
    return
  }
  fetchFigmaFile(FILE_KEY)
    .then((data) => getComponentsFromNode(data.document))
    .then(getSVGsFromComponents)
    .then((dataArray) => dataArray.map(generateFiles))
    .then((ele) => Array.from(new Set(ele)))
    .then((texts) => {
      writeFileSync(
        './src/icons/index.ts',
        texts.reduce((t, v) => `${t}\n import ${v} from './${v}'`, ''),
      )

      appendFileSync('./src/icons/index.ts', texts.reduce((t, v) => `${t} ${v},`, '\n\n export {').slice(0, -1))

      appendFileSync('./src/icons/index.ts', '}')
    })
}

run()
