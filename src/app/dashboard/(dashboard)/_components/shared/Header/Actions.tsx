import type { FC, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLDivElement>

export const Actions: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn('ml-auto flex items-center space-x-4', className)}
    />
  )
}
