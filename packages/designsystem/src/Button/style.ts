import { cva } from 'class-variance-authority'

export const rawButtonVariants = cva(`rounded-[4px] inline-flex justify-center items-center`, {
  variants: {
    variant: {
      primary: `bg-primary-01-default text-text-white hover:bg-primary-01-hover active:bg-primary-01-press 
      focus:border-2 focus:border-solid focus:border-background-default focus:outline focus:outline-1 focus:outline-border-primary-02
      disabled:bg-background-extension-disabled-bg disabled:text-text-disabled`,

      secondary: `bg-tertiary-default border border-solid border-border-01 text-text-01 hover:bg-tertiary-hover active:bg-tertiary-press 
      focus:border-2 focus:border-solid focus:border-border-selected
      disabled:bg-background-extension-disabled-bg disabled:border-border-disabled disabled:text-text-disabled`,
      custom: '',
    },

    size: {
      medium: 'gap-spacing-1 body-02-r',
      large: 'gap-spacing-1 body-03-r',
      small: 'gap-spacing-1 body-01-r',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
})

export const buttonVariants = cva('', {
  variants: {
    size: {
      // primarymedium: 'h-9 px-spacing-3 py-spacing-1',
      // primarylarge: 'h-10 px-spacing-4 py-spacing-3',
      // primarysmall: 'h-6 px-spacing-2 py-spacing-1',

      medium: 'h-9 px-spacing-3 py-spacing-2',
      large: 'h-10 px-spacing-4 py-spacing-3',
      small: 'h-6 px-spacing-2 py-spacing-1',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export const iconButtonVariants = cva('', {
  variants: {
    size: {
      medium: 'p-spacing-2',
      large: 'p-spacing-2',
      small: 'p-spacing-1',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export const LeftButtonIconVariants = cva(``, {
  variants: {
    size: {
      medium: '[&>svg]:w-spacing-5 [&>svg]:h-spacing-5',
      large: '[&>svg]:w-6 [&>svg]:h-6',
      small: '[&>svg]:w-spacing-5 [&>svg]:h-spacing-5',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export const RightButtonIconVariants = cva(``, {
  variants: {
    size: {
      medium: '[&>svg]:w-spacing-3 [&>svg]:h-spacing-3',
      large: '[&>svg]:w-4 h-4',
      small: '[&>svg]:w-spacing-3 [&>svg]:h-spacing-3',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})
