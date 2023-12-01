import { FC, HTMLAttributes } from 'react'

import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: 'success' | 'error' | 'warning' | 'info'
}

export const FieldMessage: FC<Props> = ({
  variant = 'info',
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'text-sm',
        variant === 'success' && 'text-green-500',
        variant === 'error' && 'text-red-500',
        variant === 'warning' && 'text-yellow-500',
        className
      )}
    />
  )
}
