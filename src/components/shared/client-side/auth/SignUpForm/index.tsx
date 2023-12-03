'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { SyntheticEvent } from 'react'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Button,
  FieldMessage,
  Fieldset,
  Input,
  Label,
} from '@/components/shared/agnostic'
import { FetchClient } from '@/libs/fetch-client'
import { backend, frontend } from '@/libs/navigation'

type ValidationErrors = {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export const SignUpForm = () => {
  const callbackUrl = frontend.storefront.home()

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const router = useRouter()

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()
      setValidationErrors({})

      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData)

      if (data.password !== data.passwordConfirmation) {
        return setValidationErrors((state) => ({
          ...state,
          passwordConfirmation: 'As senhas não conferem',
        }))
      }

      const fetchClient = new FetchClient()
      const url = backend.users.clientSignUp()

      const apiResponse = await fetchClient.post(url, {
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (!apiResponse.ok) {
        const { message, validationErrors } = await apiResponse.json()

        validationErrors &&
          setValidationErrors((state) => ({
            ...state,
            ...validationErrors,
          }))

        message && toast.warning(message)
      } else {
        const signInResponse = await signIn('credentials', {
          email: data.email,
          password: data.password,
          role: 'client',
          redirect: false,
        })

        if (signInResponse?.ok) {
          toast.success('Conta criada com sucesso!')
          router.push(callbackUrl)
        }
      }
    },
    [callbackUrl, router]
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
