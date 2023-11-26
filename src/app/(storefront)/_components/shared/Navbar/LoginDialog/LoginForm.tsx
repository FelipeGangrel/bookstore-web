'use client'

import { signIn } from 'next-auth/react'
import type { FC, FormEvent, HTMLAttributes } from 'react'
import { useCallback, useState } from 'react'

import { Button, Input } from '@/components/agnostic'
import { cn } from '@/libs/styles'

type Props = HTMLAttributes<HTMLFormElement>

export const LoginForm: FC<Props> = ({ className, ...props }) => {
  const [email, setEmail] = useState('client@example.com')
  const [password, setPassword] = useState('123456')

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const response = await signIn('credentials', {
        email,
        password,
        role: 'client',
        redirect: false,
      })

      if (response) {
        console.log(response)
      }
    },
    [email, password]
  )

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-8', className)}
    >
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="md" variant="dark" className="w-full">
          Entrar
        </Button>

        <Button size="md" variant="light" className="w-full border-transparent">
          Criar conta
        </Button>
      </div>
    </form>
  )
}
