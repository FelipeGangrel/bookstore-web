'use client'

import { User } from '@phosphor-icons/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { ActivityIndicator } from '@/components/agnostic'
import { Popover } from '@/components/client-side'
import { FetchClient } from '@/libs/fetch-client'

export const UserWidget = () => {
  const { status, data } = useSession()

  const handleSignOut = useCallback(async () => {
    const fetchClient = new FetchClient()

    await fetchClient.get('/auth/logout')
    await signOut()
  }, [])

  return (
    <Popover.Root>
      <Popover.Trigger className="hover:text-slate-500">
        <User size="24" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end">
          {status === 'loading' && <ActivityIndicator size="24" />}

          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-baseline gap-1">
                <span className="text-lg font-semibold">
                  Olá, {data.user.name}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/account"
                  className="text-sm text-gray-400 hover:text-gray-500"
                >
                  Minha conta
                </Link>
                <Link
                  href="/purchase-history"
                  className="text-sm text-gray-400 hover:text-gray-500"
                >
                  Minhas compras
                </Link>
              </div>

              <hr className="border-gray-200" />

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
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
