'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import { useCallback, useState } from 'react'

import {
  Button,
  FieldMessage,
  Fieldset,
  Input,
  Label,
  Link,
} from '@/components/agnostic'

type ValidationErrors = {
  email?: string
  password?: string
}

export default function SignInPage() {
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
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="text"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors?.email && (
            <FieldMessage variant="error">
              {validationErrors.email}
            </FieldMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors?.password && (
            <FieldMessage variant="error">
              {validationErrors.password}
            </FieldMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Link href="/password-reset" className="text-right">
            Esqueci minha senha
          </Link>
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full">
          Entrar
        </Button>

        <NextLink href="/sign-up">
          <Button color="secondary" className="w-full">
            Ainda não tenho uma conta
          </Button>
        </NextLink>
      </div>
    </form>
  )
}
