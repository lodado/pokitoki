import { contextBuildHelper } from '@custompackages/shared'

export const [DropdownProvider, useDropdownContext] = contextBuildHelper<{
  isVisible: boolean
  setVisible: (value: boolean) => void
}>({
  id: 'dropdown',
})
