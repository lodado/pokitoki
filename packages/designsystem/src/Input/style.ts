import { cva } from 'class-variance-authority'

export const InputStyleVariants = cva(
  `flex px-3 items-center gap-3 rounded border border-solid body-01-r text-text-01 border-border-01 bg-tertiary-default placeholder-text-placeholder`,
  {
    variants: {
      variant: {
        default: `hover:bg-tertiary-hover active:bg-tertiary-press focus-within:outline 
        focus-within:outline-2 focus-within:outline-border-primary-01 disabled:bg-text-disabled 
        read-only:bg-text-readonly 
      `,
        invalid: `border-border-error-01 focus-within:outline-2 focus-within:outline-border-error-01`,
      },

      size: {
        medium: 'h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
)
