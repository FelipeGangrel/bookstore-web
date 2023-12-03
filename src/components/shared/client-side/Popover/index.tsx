import {
  Arrow as RArrow,
  Content as RContent,
  PopoverArrowProps,
  PopoverContentProps,
} from '@radix-ui/react-popover'
import type { FC } from 'react'

import { cn } from '@/libs/styles'

export type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverProps,
  PopoverTriggerProps,
} from '@radix-ui/react-popover'
export { Portal, Root, Trigger } from '@radix-ui/react-popover'

export const Content: FC<PopoverContentProps> = ({ className, ...props }) => (
  <RContent
    {...props}
    className={cn(
      'z-10 rounded-md bg-white p-4 shadow-md outline-none',
      className
    )}
  />
)

export const Arrow: FC<PopoverArrowProps> = ({ className, ...props }) => (
  <RArrow {...props} className={cn('fill-white', className)} />
)
