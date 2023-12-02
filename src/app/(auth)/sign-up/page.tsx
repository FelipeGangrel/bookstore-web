'use client'

import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import type { FormEvent, SyntheticEvent } from 'react'
import { useCallback, useState } from 'react'

import {
  Button,
  FieldMessage,
  Fieldset,
  Input,
  Label,
} from '@/components/agnostic'
import { FetchClient } from '@/libs/fetch-client'

type ValidationErrors = {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export default function SignUpPage() {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData)

      const fetchClient = new FetchClient()

      const apiCreateClientResponse = await fetchClient.post('/clients', {
        name: data.name,
        email: data.email,
        password: data.password,
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
          email: data.email,
          password: data.password,
          role: 'client',
          redirect: false,
        })
      }
    },
    []
  )

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Criar minha conta</h4>

      <div className="flex flex-col gap-4">
        <Fieldset>
          <Label htmlFor="name">Nome completo</Label>
          <Input name="name" placeholder="Nome completo" />
          {validationErrors?.name && (
            <FieldMessage variant="error">{validationErrors.name}</FieldMessage>
          )}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" placeholder="E-mail" />
          {validationErrors?.email && (
            <FieldMessage variant="error">
              {validationErrors.email}
            </FieldMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" placeholder="Senha" />
          {validationErrors?.password && (
            <FieldMessage variant="error">
              {validationErrors.password}
            </FieldMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirmar senha"
          />
          {validationErrors?.passwordConfirmation && (
            <FieldMessage variant="error">
              {validationErrors.passwordConfirmation}
            </FieldMessage>
          )}
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full">
          Criar minha conta
        </Button>

        <NextLink href="/sign-in">
          <Button color="secondary" className="w-full">
            Voltar
          </Button>
        </NextLink>
      </div>
    </form>
  )
}
