import { cva } from 'class-variance-authority'

export const StyledMessage = cva(
  'flex flex-start p-3 top-6 shadow-tooltip rounded bg-background-default flex-nowrap break-all',
  {
    variants: {
      role: {
        assistant: 'relative left-[80px] w-[calc(50%)] min-h-[calc(100%-10px)]',
        user: 'relative w-[calc(50%)] right-[100px] min-h-[calc(100%-10px)]',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  },
)
