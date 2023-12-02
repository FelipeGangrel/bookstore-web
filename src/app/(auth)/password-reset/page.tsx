'use client'

import type { SyntheticEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { Button, Fieldset, Input, Label } from '@/components/agnostic'
import { PinInput } from '@/components/client-side'

type ResetStep = 'email' | 'code' | 'password'

export default function PasswordResetPage() {
  const [step, setStep] = useState<ResetStep>('email')

  const title = useMemo(() => {
    switch (step) {
      case 'email':
        return 'Recuperar senha'
      case 'code':
        return 'Código de verificação'
      case 'password':
        return 'Nova senha'
    }
  }, [step])

  const submitButtonText = useMemo(() => {
    switch (step) {
      case 'email':
        return 'Obter código'
      case 'code':
        return 'Verificar código'
      case 'password':
        return 'Redefinir senha'
    }
  }, [step])

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      console.log(Object.fromEntries(formData))
    },
    []
  )

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">{title}</h4>

      <div className="flex flex-col gap-4">
        {step === 'email' && (
          <Fieldset>
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" />
          </Fieldset>
        )}

        <Fieldset>
          <PinInput length={6} onChange={console.log} />
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full">
          {submitButtonText}
        </Button>
      </div>
    </form>
  )
}
