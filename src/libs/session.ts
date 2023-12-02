import { getServerSession as gss, Session } from 'next-auth'

import { authOptions } from '@/config/auth'

export function getServerSession(): Promise<Session | null> {
  return gss(authOptions)
}
