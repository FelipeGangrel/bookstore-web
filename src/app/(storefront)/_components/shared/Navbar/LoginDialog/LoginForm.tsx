import type { FC, HTMLAttributes } from 'react'

import { Input } from '@/components/agnostic'
import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLFormElement>

export const LoginForm: FC<Props> = ({ className, ...props }) => {
  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      <Input type="email" placeholder="E-mail" />
      <Input type="password" placeholder="Senha" />
    </form>
  )
}
