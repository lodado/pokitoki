import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import nodeExternals from 'rollup-plugin-node-externals'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import { visualizer } from 'rollup-plugin-visualizer'

const inputSrc = [
  ['./index.tsx', 'esm'],
  ['./index.tsx', 'cjs'],
]

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx']

export default inputSrc.map(([input, format]) => {
  return {
    input,
    output: {
      dir: `dist/${format}`,
      format,

      preserveModules: true,

      exports: 'named',
    },

    plugins: [
      typescript(),

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
      peerDepsExternal(),

      /**
       * **IMPORTANT**: Order matters!
       * When using @rollup/plugin-babel with @rollup/plugin-commonjs in the same Rollup configuration,
       * it's important to note that @rollup/plugin-commonjs must be placed before this plugin in the plugins array for the two to work together properly.
       * @see https://github.com/rollup/plugins/tree/master/packages/babel#using-with-rollupplugin-commonjs
       */
      commonjs(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**', extensions }),

      postcss({
        plugins: [],
      }),

      visualizer({ filename: 'stats.html' }),

      url(),
      terser(),
    ],
  }
})
