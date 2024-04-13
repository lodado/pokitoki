import { DEFAULT_EXTENSIONS } from '@babel/core'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import path from 'path'
import postcssImport from 'postcss-import'
import { dts } from 'rollup-plugin-dts'
import css from 'rollup-plugin-import-css'
import { nodeExternals } from 'rollup-plugin-node-externals'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'

const BUILD_OUTPUT_LOCATION = 'dist'

const ENTRY_POINT = './src/index.tsx'

const dirname = fileURLToPath(new URL('.', import.meta.url))
const filename = fileURLToPath(import.meta.url)

const inputSrc = [
  [ENTRY_POINT, 'es'],
  [ENTRY_POINT, 'cjs'],
]

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx']

// eslint-disable-next-line import/no-mutable-exports
let rollupConfigs = inputSrc.map(([input, format]) => {
  const isESMFormat = format === 'es'

  return {
    input,
    output: {
      dir: `${BUILD_OUTPUT_LOCATION}/${format}`,
      format,

      preserveModules: isESMFormat,

      exports: 'named',
    },

    external: ['react/jsx-runtime'],

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

      typescript(),
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
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        extensions,
      }),

      postcss({
        extract: true,
        plugins: [postcssImport()],
      }),

      visualizer({ filename: 'stats.html' }),

      url(),
      css(),
      terser(),
    ],
  }
})

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

export default rollupConfigs