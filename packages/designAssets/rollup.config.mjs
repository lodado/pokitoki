import { rollupConfigFunc } from 'rollup-config/rollup.config.mjs'
 
const config = rollupConfigFunc([
  { input: './index.ts', format: 'es', additionalFolderDirectiory: 'client', useTsconfigDeclarationDir: false },
  { input: './index.ts', format: 'cjs', additionalFolderDirectiory: 'client', useTsconfigDeclarationDir: false },

  { input: './index.server.ts', format: 'es', additionalFolderDirectiory: 'server', useTsconfigDeclarationDir: false },
  { input: './index.server.ts', format: 'cjs', additionalFolderDirectiory: 'server', useTsconfigDeclarationDir: false },
])
export default config
