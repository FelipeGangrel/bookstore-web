import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { FetchClient } from '@/libs/fetch-client'
import { backend } from '@/libs/navigation'

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

        const url =
          credentials?.role === 'admin'
            ? backend.auth.adminSignIn()
            : backend.auth.clientSignIn()

        const apiRes = await fetchClient.post(url, {
          email: credentials?.email,
          password: credentials?.password,
        })

        const apiData = await apiRes.json()

        if (apiData?.user) {
          return {
            ...apiData.user,
            jwt: apiData.jwt,
          }
        } else {
          throw new Error(JSON.stringify(apiData))
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
        return {
          ...session,
          user: token.user,
        }
      }

      return session
    },
  },
}
