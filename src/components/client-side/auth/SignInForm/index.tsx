'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FC, SyntheticEvent } from 'react'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Button,
  FieldMessage,
  Fieldset,
  Input,
  Label,
} from '@/components/agnostic'
import { Link } from '@/components/client-side'
import { frontend } from '@/libs/navigation'

type Props = {
  role: 'client' | 'admin'
}

type ValidationErrors = {
  email?: string
  password?: string
}

export const SignInForm: FC<Props> = ({ role }) => {
  const passwordResetUrl =
    role === 'client'
      ? frontend.storefront.auth.passwordReset()
      : frontend.dashboard.auth.passwordReset()

  const callbackUrl =
    role === 'client' ? frontend.storefront.home() : frontend.dashboard.home()

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const router = useRouter()

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)

      const res = await signIn('credentials', {
        ...Object.fromEntries(formData),
        role,
        redirect: false,
        callbackUrl,
      })

      if (res?.error) {
        const { message, validationErrors } = JSON.parse(res.error)
        validationErrors && setValidationErrors(validationErrors)
        message && toast.warning(message)
      } else {
        toast.success('Login efetuado com sucesso!')
        router.push(callbackUrl)
      }
    },
    [callbackUrl, role, router]
  )

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Entrar</h4>

      <div className="flex flex-col gap-4">
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
          <Link href={passwordResetUrl} className="ml-auto">
            Esqueci minha senha
          </Link>
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="sm" className="w-full">
          Entrar
        </Button>

        {role === 'client' && (
          <NextLink href="/sign-up">
            <Button color="secondary" className="w-full">
              Ainda não tenho uma conta
            </Button>
          </NextLink>
        )}
      </div>
    </form>
  )
}
