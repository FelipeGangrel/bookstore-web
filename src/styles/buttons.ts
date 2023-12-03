import { tv, VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-md border font-medium active:opacity-80 disabled:opacity-50',
  variants: {
    color: {
      primary: 'border-black bg-black text-white hover:bg-gray-800',
      secondary: 'border-gray-300 bg-white text-black hover:bg-gray-50',
      danger: 'border-rose-500 bg-rose-500 text-white hover:bg-rose-400',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-4 py-2',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export type ButtonVariants = VariantProps<typeof button>

export const link = tv({
  base: 'w-fit hover:underline active:opacity-80',
  variants: {
    color: {
      primary: 'text-gray-700 hover:text-gray-800',
      secondary: 'text-gray-400 hover:text-gray-500',
      danger: 'text-rose-500 hover:text-rose-300',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export type LinkVariants = VariantProps<typeof link>
