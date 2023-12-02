import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLLabelElement>

export const Label: FC<Props> = ({ className, ...props }) => {
  return (
    <label {...props} className={cn('font-medium text-slate-700', className)} />
  )
}
