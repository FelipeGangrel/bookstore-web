'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import { useCallback, useState } from 'react'

import { Button, Input } from '@/components/agnostic'
import { FetchClient } from '@/libs/api-fetcher'

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

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const fetchClient = new FetchClient()

      const apiCreateClientResponse = await fetchClient.post('/clients', {
        name,
        email,
        password,
      })

      const apiCreateClientData = await apiCreateClientResponse.json()

      if (apiCreateClientData?.validationErrors) {
        return setValidationErrors(apiCreateClientData.validationErrors)
      }

      if (apiCreateClientData?.token) {
        await signIn('credentials', {
          user: JSON.stringify(apiCreateClientData?.user),
          jwt: apiCreateClientData.token,
          redirect: false,
        })
      }
    },
    [email, name, password]
  )

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Criar minha conta</h4>

      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <Input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors?.name && (
            <span className="text-sm text-red-500">
              {validationErrors.name}
            </span>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors?.email && (
            <span className="text-sm text-red-500">
              {validationErrors.email}
            </span>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors?.password && (
            <span className="text-sm text-red-500">
              {validationErrors.password}
            </span>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirmar senha"
          />
          {validationErrors?.passwordConfirmation && (
            <span className="text-sm text-red-500">
              {validationErrors.passwordConfirmation}
            </span>
          )}
        </fieldset>
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
