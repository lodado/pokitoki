import { rollupConfigFunc } from 'rollup-config/rollup.config.mjs'
 
const config = rollupConfigFunc([
  { input: './index.ts', format: 'es', additionalFolderDirectiory: 'client' },
  { input: './index.ts', format: 'cjs', additionalFolderDirectiory: 'client' },

  // { input: './src/index.server.ts', format: 'es', additionalFolderDirectiory: 'server' },
  // { input: './src/index.server.ts', format: 'cjs', additionalFolderDirectiory: 'server' },
])
export default config
