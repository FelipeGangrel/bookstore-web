import { tv, VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'rounded-md border font-medium active:opacity-80',
  variants: {
    color: {
      primary: 'border-black bg-black text-white',
      secondary: 'border-gray-300 bg-white text-black',
      danger: 'border-red-500 bg-red-500 text-white',
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
      class: 'px-3 py-2',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export type ButtonVariants = VariantProps<typeof button>

export const link = tv({
  base: 'hover:underline active:opacity-80',
  variants: {
    color: {
      primary: 'hover:text-gray-890 text-gray-700',
      secondary: 'text-gray-400 hover:text-gray-500',
      danger: 'text-red-500 hover:text-red-300',
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