import NextLink from 'next/link'
import type { FC } from 'react'

import { cn } from '@/libs/styles'
import { link, LinkVariants } from '@/styles/buttons'

type Props = Parameters<typeof NextLink>[0] & LinkVariants

export const Link: FC<Props> = ({ className, color, size, ...props }) => {
  return (
    <NextLink {...props} className={cn(link({ size, color }), className)} />
  )
}
