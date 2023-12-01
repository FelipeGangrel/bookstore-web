'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import { useCallback, useState } from 'react'

import { Button, FieldMessage, Fieldset, Input } from '@/components/agnostic'

type ValidationErrors = {
  email?: string
  password?: string
}

export default function LoginPage() {
  const [email, setEmail] = useState('client@example.com')
  const [password, setPassword] = useState('123456')
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const res = await signIn('credentials', {
        email,
        password,
        role: 'client',
        redirect: false,
      })

      if (res?.error) {
        const { message, validationErrors } = JSON.parse(res.error)
        validationErrors && setValidationErrors(validationErrors)
        message && alert(message)
      } else {
        router.push('/')
      }
    },
    [email, password, router]
  )

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Entrar</h4>

      <div className="flex flex-col gap-4">
        <Fieldset>
          <Input
            type="text"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors?.email && (
            <FieldMessage>{validationErrors.email}</FieldMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors?.password && (
            <FieldMessage>{validationErrors.password}</FieldMessage>
          )}
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="md" variant="dark" className="w-full">
          Entrar
        </Button>

        <Link href="/sign-up">
          <Button
            size="md"
            variant="light"
            className="w-full border-transparent"
          >
            Ainda não tenho uma conta
          </Button>
        </Link>
      </div>
    </form>
  )
}
