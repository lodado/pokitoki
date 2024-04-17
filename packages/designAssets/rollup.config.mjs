import { rollupConfigFunc } from 'rollup-config/rollup.config.mjs'
 
const config = rollupConfigFunc([
  { input: './src/index.ts', format: 'es', additionalFolderDirectiory: 'client' },
  { input: './src/index.ts', format: 'cjs', additionalFolderDirectiory: 'client' },

  { input: './src/index.server.ts', format: 'es', additionalFolderDirectiory: 'server' },
  { input: './src/index.server.ts', format: 'cjs', additionalFolderDirectiory: 'server' },
])
export default config
