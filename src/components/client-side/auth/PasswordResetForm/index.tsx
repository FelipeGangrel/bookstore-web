'use client'

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
import { PinInput } from '@/components/client-side'
import { FetchClient } from '@/libs/fetch-client'
import { frontend } from '@/libs/navigation'

type Props = {
  role: 'client' | 'admin'
}

type ResetStep = 'email' | 'token-and-password'

type ValidationErrors = {
  email?: string
  password?: string
  token?: string
}

export const PasswordResetForm: FC<Props> = ({ role }) => {
  const callbackUrl =
    role === 'client' ? frontend.storefront.home() : frontend.dashboard.home()

  const [step, setStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState({
    complete: false,
    value: '',
  })
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const router = useRouter()

  const generatePasswordResetToken = useCallback(async (email: string) => {
    const fetchClient = new FetchClient()
    const url = '/password-reset/generate-token'

    const apiResponse = await fetchClient.post(url, {
      email,
    })

    if (!apiResponse.ok) {
      const { message, validationErrors } = await apiResponse.json()
      validationErrors && setValidationErrors(validationErrors)
      message && toast.warning(message)
    } else {
      setEmail(email)
      setStep('token-and-password')
      toast.info('Código de verificação enviado para seu e-mail!')
    }
  }, [])

  const updatePassword = useCallback(
    async (password: string, token: string) => {
      const fetchClient = new FetchClient()
      const url = '/password-reset/update-password'

      const apiResponse = await fetchClient.post(url, {
        email,
        password,
        token,
      })

      if (!apiResponse.ok) {
        const { message, validationErrors } = await apiResponse.json()
        validationErrors && setValidationErrors(validationErrors)
        message && toast.warning(message)
      } else {
        const signInResponse = await signIn('credentials', {
          email,
          password,
          role,
          redirect: false,
        })

        if (signInResponse?.ok) {
          toast.success('Senha atualizada com sucesso!')
          router.push(callbackUrl)
        }
      }
    },
    [callbackUrl, email, role, router]
  )

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()
      setValidationErrors({})

      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData)

      if (step === 'email') {
        return generatePasswordResetToken(data.email as string)
      } else if (step === 'token-and-password' && pin.complete) {
        return updatePassword(data.password as string, pin.value)
      }
    },
    [generatePasswordResetToken, step, pin, updatePassword]
  )

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">
        {step === 'email' && 'Informe seu e-mail'}
        {step === 'token-and-password' && 'Redefina sua senha'}
      </h4>

      <div className="flex flex-col gap-4">
        {step === 'email' && (
          <Fieldset>
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" />
            {validationErrors.email && (
              <FieldMessage variant="error">
                {validationErrors.email}
              </FieldMessage>
            )}
          </Fieldset>
        )}

        {step === 'token-and-password' && (
          <>
            <Fieldset>
              <Label htmlFor="token">Código de verificação</Label>
              <PinInput length={6} onPinChange={setPin} />
              {validationErrors.token && (
                <FieldMessage variant="error">
                  {validationErrors.token}
                </FieldMessage>
              )}
            </Fieldset>
            {pin.complete && (
              <Fieldset>
                <Label htmlFor="password">Nova senha</Label>
                <Input name="password" type="password" />
                {validationErrors.password && (
                  <FieldMessage variant="error">
                    {validationErrors.password}
                  </FieldMessage>
                )}
              </Fieldset>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full"
          disabled={step === 'token-and-password' && !pin.complete}
        >
          {step === 'email' && 'Enviar código'}
          {step === 'token-and-password' && 'Atualizar senha'}
        </Button>
      </div>
    </form>
  )
}
