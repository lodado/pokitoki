import { cva } from 'class-variance-authority'

export const InputStyleVariants = cva(`flex px-3 items-center gap-3 rounded border border-solid body-01-r`, {
  variants: {
    variant: {
      default: `text-text-01 border-border-01 bg-tertiary-default placeholder-text-placeholder hover:bg-tertiary-hover
        active:bg-tertiary-press focus:border-border-primary-01 disabled:bg-text-disabled 
        read-only:bg-text-readonly
        [&[data-invalid='true']]:border-border-error-01
      `,
    },

    size: {
      medium: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
})
