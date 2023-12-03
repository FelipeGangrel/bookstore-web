import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLDivElement>

export const Root: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn('justify flex flex-row items-center', className)}
    />
  )
}
