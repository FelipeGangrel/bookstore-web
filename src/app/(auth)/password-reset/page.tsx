'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { SyntheticEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'

import {
  Button,
  FieldMessage,
  Fieldset,
  Input,
  Label,
} from '@/components/agnostic'
import { PinInput } from '@/components/client-side'
import { FetchClient } from '@/libs/fetch-client'

type ResetStep = 'email' | 'token-and-password'

type ValidationErrors = {
  email?: string
  password?: string
  token?: string
}

export default function PasswordResetPage() {
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
      message && alert(message)
    } else {
      setEmail(email)
      setStep('token-and-password')
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
        message && alert(message)
      }

      if (apiResponse.ok) {
        await signIn('credentials', {
          email,
          password,
          role: 'client',
          callbackUrl: '/',
        })
      }
    },
    [email]
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
        {step === 'token-and-password' && 'Informe o código de verificação'}
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
