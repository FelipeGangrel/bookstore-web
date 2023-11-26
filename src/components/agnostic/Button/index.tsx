import type { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/libs/styles'

const buttonClasses = tv({
  base: 'rounded-md border font-medium active:opacity-80',
  variants: {
    variant: {
      primary: 'border-yellow-300 bg-yellow-300 text-black',
      danger: 'border-red-500 bg-red-500 text-white',
      light: 'border-gray-300 bg-white text-black',
      dark: 'border-black bg-black text-white',
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
    variant: 'primary',
  },
})

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: FC<Props> = ({
  children,
  className,
  size,
  variant,
  type = 'button',
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonClasses({ size, variant }), className)}
    >
      {children}
    </button>
  )
}
