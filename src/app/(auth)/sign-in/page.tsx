'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import { useCallback, useState } from 'react'

import { Button, Input } from '@/components/agnostic'
import { FetchClient } from '@/libs/fetch-client'

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

      const fetchClient = new FetchClient()

      const apiLoginResponse = await fetchClient.post('/auth/client-login', {
        email,
        password,
      })

      const apiLoginData = await apiLoginResponse.json()

      if (apiLoginData?.validationErrors) {
        return setValidationErrors(apiLoginData.validationErrors)
      }

      if (apiLoginData?.jwt) {
        await signIn('credentials', {
          user: JSON.stringify(apiLoginData?.user),
          jwt: apiLoginData.jwt,
          redirect: false,
        })

        router.push('/')
      }
    },
    [email, password, router]
  )

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Entrar</h4>

      <div className="flex flex-col gap-4">
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
