import type { FC, LabelHTMLAttributes } from 'react'

import { cn } from '@/libs/styles'

type Props = LabelHTMLAttributes<HTMLLabelElement>

export const Label: FC<Props> = ({ className, ...props }) => {
  return (
    <label {...props} className={cn('font-medium text-slate-700', className)} />
  )
}
