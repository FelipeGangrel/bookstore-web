import type { FC, InputHTMLAttributes } from 'react'

import { cn } from '@/libs/styles'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input: FC<Props> = ({ className, ...props }) => {
  return <input type="text" {...props} className={cn('input', className)} />
}
