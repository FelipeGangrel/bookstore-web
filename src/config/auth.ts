import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { FetchClient } from '@/libs/api-fetcher'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      authorize: async (credentials) => {
        const fetchClient = new FetchClient()

        try {
          const url =
            credentials?.role == 'admin'
              ? '/auth/admin-login'
              : '/auth/client-login'

          const response = await fetchClient.post(url, {
            email: credentials?.email,
            password: credentials?.password,
          })

          const data = await response.json()

          if (data?.user) {
            return {
              ...data.user,
              jwt: data.token,
            }
          }

          return null
        } catch (error: any) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        return { ...session, user: token.user }
      }

      return session
    },
  },
}
