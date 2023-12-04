import type { ButtonHTMLAttributes, FC } from 'react'

import { cn } from '@/libs/styles'
import { button, ButtonVariants } from '@/styles/buttons'

import { ActivityIndicator } from '..'

type Props = {
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants

export const Button: FC<Props> = ({
  className,
  size,
  color,
  loading,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button {...props} className={cn(button({ size, color }), className)}>
      {loading ? <ActivityIndicator /> : children}
    </button>
  )
}
