import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLFieldSetElement>

export const Fieldset: FC<Props> = ({ className, ...props }) => {
  return (
    <fieldset {...props} className={cn('flex flex-col gap-2', className)} />
  )
}
