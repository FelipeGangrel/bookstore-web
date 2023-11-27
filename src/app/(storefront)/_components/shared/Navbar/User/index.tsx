'use client'

import { User } from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { ActivityIndicator } from '@/components/agnostic'
import { FetchClient } from '@/libs/fetch-client'

export const UserWidget = () => {
  const { status, data } = useSession()

  const handleSignOut = useCallback(async () => {
    const fetchClient = new FetchClient()

    const apiLogoutResponse = await fetchClient.get('/auth/logout')

    if (apiLogoutResponse.ok) {
      await signOut()
    }
  }, [])

  return (
    <Popover.Root>
      <Popover.Trigger>
        <User size="24" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="z-20 rounded bg-white p-4 shadow-lg"
        >
          {status === 'loading' && <ActivityIndicator size="24" />}

          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-baseline gap-1">
                <span className="text-lg font-semibold">{data.user.name}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/account"
                  className="text-sm text-gray-400 hover:text-gray-500"
                >
                  Minha conta
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  className="text-left text-sm text-gray-400 hover:text-gray-500"
                  onClick={handleSignOut}
                >
                  Sair
                </button>
              </div>
            </div>
          )}

          {status === 'unauthenticated' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-baseline gap-1">
                <span className="text-lg font-semibold">Olá, visitante</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  className="text-left text-sm text-gray-400 hover:text-gray-500"
                >
                  Entrar
                </Link>
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
