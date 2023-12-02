'use client'

import { SessionProvider } from 'next-auth/react'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const NextSessionProvider: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
