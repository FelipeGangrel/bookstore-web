import type { ButtonHTMLAttributes, FC } from 'react'

import { cn } from '@/libs/styles'
import { button, ButtonVariants } from '@/styles/buttons'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants

export const Button: FC<Props> = ({
  className,
  size,
  color,
  type = 'button',
  ...props
}) => {
  return (
    <button {...props} className={cn(button({ size, color }), className)} />
  )
}
