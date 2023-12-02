'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import { useCallback, useState } from 'react'

import { Button, FieldMessage, Fieldset, Input } from '@/components/agnostic'
import { FetchClient } from '@/libs/fetch-client'

type ValidationErrors = {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export default function CreateAccountPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setValidationErrors((state) => ({
        ...state,
        passwordConfirmation:
          password !== passwordConfirmation
            ? 'As senhas não coincidem'
            : undefined,
      }))

      const fetchClient = new FetchClient()

      const apiCreateClientResponse = await fetchClient.post('/clients', {
        name,
        email,
        password,
      })

      const apiCreateClientData = await apiCreateClientResponse.json()

      if (apiCreateClientData?.validationErrors) {
        return setValidationErrors((state) => ({
          ...state,
          ...apiCreateClientData.validationErrors,
        }))
      }

      if (apiCreateClientData?.token) {
        await signIn('credentials', {
          user: JSON.stringify(apiCreateClientData?.user),
          jwt: apiCreateClientData.token,
          redirect: false,
        })
      }
    },
    [email, name, password, passwordConfirmation]
  )

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Criar minha conta</h4>

      <div className="flex flex-col gap-4">
        <Fieldset>
          <Input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors?.name && (
            <FieldMessage variant="error">{validationErrors.name}</FieldMessage>
          )}
        </Fieldset>

        <Fieldset>
          <Input
            type="email"
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
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirmar senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {validationErrors?.passwordConfirmation && (
            <FieldMessage variant="error">
              {validationErrors.passwordConfirmation}
            </FieldMessage>
          )}
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="md" variant="dark" className="w-full">
          Criar minha conta
        </Button>

        <Link href="/sign-in">
          <Button
            size="md"
            variant="light"
            className="w-full border-transparent"
          >
            Voltar
          </Button>
        </Link>
      </div>
    </form>
  )
}
