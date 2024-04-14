import { DEFAULT_EXTENSIONS } from '@babel/core'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import path from 'path'
import postcssImport from 'postcss-import'
import { nodeExternals } from 'rollup-plugin-node-externals'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import typescript from 'rollup-plugin-typescript2'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'

const dirname = '.' // fileURLToPath(new URL('.', import.meta.url))
// const filename = fileURLToPath(import.meta.url)

const BUILD_OUTPUT_LOCATION = `${dirname}/dist`

const ENTRY_POINT = `${dirname}/src/index.tsx`

const inputSrc = [
  { input: ENTRY_POINT, format: 'es', additionalFolderDirectiory: 'client' },
  { input: ENTRY_POINT, format: 'cjs', additionalFolderDirectiory: 'client' },
]

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
/**
 * Generates an array of Rollup configuration objects based on the provided array of configuration parameters.
 * Each configuration parameter object includes options for input, format, and optionally an additional directory path.
 * 
 * @param {Object[]} config - An array of configuration objects. Each object must have an `input` and `format` property.
 *                            `additionalFolderDirectiory` is optional and defaults to an empty string.
 * @returns {Object[]} An array of Rollup configuration objects tailored to the specifications provided in the `config` parameter.
 * 
 * @example
 * rollupConfigFunc([
 *   { input: 'src/index.js', format: 'es', additionalFolderDirectiory: 'dist' },
 *   { input: 'src/api.js', format: 'cjs' }
 * ]);
 */
// eslint-disable-next-line import/no-mutable-exports
const rollupConfigFunc = (config) =>
  config.map(({ input, format, additionalFolderDirectiory = '' }) => {
    const isESMFormat = format === 'es'
    const entryFormat = isESMFormat ? 'mjs' : 'cjs'

    const entryFileNames = `[name].${entryFormat}`
    const dir = `${BUILD_OUTPUT_LOCATION}/${format}/${
      additionalFolderDirectiory ? `${additionalFolderDirectiory}/` : ''
    }`

    return {
      input,
      output: {
        dir,
        format,
        preserveModulesRoot: `${dirname}/src`,
        preserveModules: isESMFormat,
        entryFileNames,

        exports: 'named',
      },

      plugins: [
        /**
         * **IMPORTANT**: Order matters!
         * If you're also using @rollup/plugin-node-resolve, make sure this plugin comes before it in the plugins array
         * @see https://github.com/Septh/rollup-plugin-node-externals#3-order-matters
         */
        nodeExternals({
          deps: false,
          peerDeps: true,
          packagePath: './package.json',
        }),
        nodeResolve({ extensions }),

        typescript({
          tsconfig: './tsconfig.json',
          tsconfigOverride: {},
        }),
        peerDepsExternal(),

        alias({
          entries: [{ find: '@', replacement: path.resolve(dirname, 'src') }],
        }),

        /**
         * **IMPORTANT**: Order matters!
         * When using @rollup/plugin-babel with @rollup/plugin-commonjs in the same Rollup configuration,
         * it's important to note that @rollup/plugin-commonjs must be placed before this plugin in the plugins array for the two to work together properly.
         * @see https://github.com/rollup/plugins/tree/master/packages/babel#using-with-rollupplugin-commonjs
         */
        commonjs({}),
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',

          extensions,
        }),

        postcss({
          extract: true,
          plugins: [postcssImport()],

          watch: {
            include: 'src/**',
            clearScreen: false,
          },
        }),

        visualizer({ filename: 'stats.html' }),

        url(),

        terser(),

        preserveDirectives({ exclude: ['**/*.scss', '**/*.pcss'] }),
      ],
    }
  })

/*
  타입은 rollup-plugin-typescript2에서 알아서 추출해주므로 명시적으로 타입을 추출해주는 dts 라이브러리를 쓰지 않아도 
  상관 없을듯함

  혹시 모르니 주석으로 첨부해둠.

import { dts } from 'rollup-plugin-dts'

rollupConfigs = rollupConfigs.concat(
  inputSrc.map(([input, format]) => {
    const typeScriptFormat = format === 'es' ? 'ts' : 'cts'

    return {
      input,
      output: [{ file: `${BUILD_OUTPUT_LOCATION}/${format}/type.d.${typeScriptFormat}`, format }],
      plugins: [dts()],
      external: [/\.(css|scss)$/u],
    }
  }),
)
*/

const defaultConfig = (additionalConfig = []) => {
  return rollupConfigFunc([...inputSrc, ...additionalConfig])
}

export { defaultConfig, rollupConfigFunc }