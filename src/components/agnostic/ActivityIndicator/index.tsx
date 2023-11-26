import { type IconProps } from '@phosphor-icons/react'
import { CircleNotch } from '@phosphor-icons/react'
import type { FC } from 'react'

export const ActivityIndicator: FC<IconProps> = ({ className, ...props }) => {
  return <CircleNotch {...props} className="animate-spin" />
}
